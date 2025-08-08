import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';

export default function HistoryTable() {
    const { history, historyLoading } = useContext(UserContext);

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    };

    const formatTime = (dateStr) => {
        const date = new Date(dateStr);
        return date.toLocaleTimeString('en-GB', { hour: 'numeric', minute: 'numeric', hour12: true });
    };

    return (
        <div style={{ marginTop: '20px' }}>
            <h3>Unlock History</h3>
            {historyLoading ? (
                <p>Loading history...</p>
            ) : history.length === 0 ? (
                <p>No unlocks yet.</p>
            ) : (
                <table border="1" cellPadding="8" style={{ borderCollapse: 'collapse', width: '100%' }}>
                    <thead>
                        <tr>
                            <th>Coach Name</th>
                            <th>Tokens Spent</th>
                            <th>XP Awarded</th>
                            <th>Date & Time</th>
                        </tr>
                    </thead>
                    <tbody>
                        {history.map((row) => (
                            <tr key={row.unlock_id}>
                                <td>{row.coach_name}</td>
                                <td>{row.tokens_spent}</td>
                                <td>{row.xp_awarded}</td>
                                <td>
                                    {formatDate(row.unlocked_at)} , {formatTime(row.unlocked_at)}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
