import React, { createContext, useState, useEffect } from 'react';
import api from '../api';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [userId, setUserId] = useState(1); // default Player 1
    const [user, setUser] = useState({
        id: userId,
        name: '',
        tokens: 0,
        xp: 0,
        loading: true
    });
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);

    // Load user details
    const loadUser = async (id) => {
        try {
            const res = await api.get(`/user/${id}`);
            if (res.data?.data) {
                setUser({ ...res.data.data, loading: false });
            } else {
                // fallback if no API data
                setUser({
                    id,
                    name: `Player ${id}`,
                    tokens: 50,
                    xp: 10,
                    loading: false
                });
            }
        } catch (err) {
            console.error('Failed to load user:', err.message);
            setUser({
                id,
                name: `Player ${id}`,
                tokens: 50,
                xp: 10,
                loading: false
            });
        }
    };

    // Load unlock history
    const loadHistory = async (id) => {
        setHistoryLoading(true);
        try {
            const res = await api.get(`/history/${id}`);
            setHistory(res.data?.data || []);
        } catch (err) {
            console.error('Failed to load history:', err);
        } finally {
            setHistoryLoading(false);
        }
    };

    // Refresh both user and history when switching player
    useEffect(() => {
        loadUser(userId);
        loadHistory(userId);
    }, [userId]);

    // Switch player
    const switchUser = (id) => {
        setUserId(id);
    };

    // Add tokens to user
    const addTokens = async (amount) => {
        try {
            const res = await api.post(`/user/${user.id}/add-tokens`, { amount });
            if (res.data.success) {
                setUser(prev => ({
                    ...prev,
                    tokens: res.data.data.tokens
                }));
                return true;
            }
            return false;
        } catch (err) {
            console.error(err);
            return false;
        }
    };

    // Public method to refresh history manually (e.g. after unlock)
    const refreshHistory = () => {
        loadHistory(user.id);
    };

    return (
        <UserContext.Provider value={{
            user,
            setUser,
            switchUser,
            addTokens,
            history,
            historyLoading,
            refreshHistory
        }}>
            {children}
        </UserContext.Provider>
    );
};
