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

    const loadUser = async (id) => {
        try {
            const res = await api.get(`/user/${id}`);
            if (res.data && res.data.data) {
                setUser({ ...res.data.data, loading: false });
            } else {
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

    useEffect(() => {
        loadUser(userId);
    }, [userId]);

    const switchUser = (id) => {
        setUserId(id);
    };

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

    return (
        <UserContext.Provider value={{ user, setUser, switchUser, addTokens }}>
            {children}
        </UserContext.Provider>
    );
};
