import React, { useEffect, useState, useContext } from 'react';
import api from '../api';
import CoachCard from './CoachCard';
import RedFlagModal from './RedFlagModal';
import { UserContext } from '../contexts/UserContext';

export default function CoachList() {
    const { user, setUser, switchUser, addTokens } = useContext(UserContext);
    const [coaches, setCoaches] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalCoach, setModalCoach] = useState(null);
    const [processing, setProcessing] = useState(false);

    useEffect(() => {
        loadCoaches();
        // eslint-disable-next-line
    }, [user.id]);

    async function loadCoaches() {
        setLoading(true);
        try {
            const res = await api.get('/coaches', { params: { userId: user.id } });
            setCoaches(res.data.data || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    function handleUnlockClick(coach) {
        if (coach.red_flag) {
            setModalCoach(coach);
        } else {
            unlockCoach(coach);
        }
    }

    async function unlockCoach(coach) {
        if (processing) return;
        setProcessing(true);
        try {
            const res = await api.post('/unlock', { userId: user.id, coachId: coach.id });
            if (res.data.success) {
                const returnData = res.data.data;
                setUser(prev => ({ ...prev, tokens: returnData.user.tokens, xp: returnData.user.xp }));
                setCoaches(prev => prev.map(c => c.id === coach.id ? { ...c, unlocked: 1 } : c));
            } else {
                alert(res.data.message || 'Unlock failed');
            }
        } catch (err) {
            alert('Unlock failed: ' + (err?.response?.data?.message || err.message));
        } finally {
            setProcessing(false);
        }
    }

    function handleModalConfirm() {
        if (modalCoach) {
            unlockCoach(modalCoach);
            setModalCoach(null);
        }
    }

    function handleModalCancel() {
        setModalCoach(null);
    }

    return (
        <div>
            {/* Top controls */}
            <div className="status" style={{ display: 'flex', gap: '12px', alignItems: 'center', marginBottom: '12px' }}>
                <div>
                    <label>Player: </label>
                    <select value={user.id} onChange={(e) => switchUser(Number(e.target.value))}>
                        <option value={1}>Player 1</option>
                        <option value={2}>Player 2</option>
                    </select>
                </div>
              <button
    onClick={async () => {
        const success = await addTokens(25);
        if (success) {
            alert('✅ Tokens added successfully!');
        } else {
            alert('❌ Failed to add tokens.');
        }
    }}
>
    +25 Tokens
</button>

                <span style={{ marginLeft: 'auto' }}>
                    <strong>{user.name}</strong> • Tokens: {user.tokens} • XP: {user.xp}
                </span>
            </div>

            {loading ? (
                <p>Loading coaches...</p>
            ) : (
                <div className="grid">
                    {coaches.map(coach => (
                        <CoachCard
                            key={coach.id}
                            coach={coach}
                            onUnlockClick={handleUnlockClick}
                            disabled={processing}
                        />
                    ))}
                </div>
            )}

            <RedFlagModal
                open={!!modalCoach}
                coach={modalCoach || {}}
                onConfirm={handleModalConfirm}
                onCancel={handleModalCancel}
            />
        </div>
    );
}
