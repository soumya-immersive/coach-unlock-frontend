// src/components/RedFlagModal.js
import React from 'react';

export default function RedFlagModal({ open, coach, onConfirm, onCancel }) {
    if (!open) return null;

    return (
        <div className="modal-backdrop">
            <div className="modal">
                <h3>⚠️ Warning: Red Flag</h3>
                <p>
                    <strong>{coach.name}</strong> has been flagged. Please proceed with caution.
                </p>
                <p>{coach.description}</p>
                <div style={{ textAlign: 'right', display: 'flex', justifyContent: 'flex-end', gap: 8 }}>
                    <button onClick={onCancel}>Cancel</button>
                    <button onClick={onConfirm}>Proceed</button>
                </div>
            </div>
        </div>
    );
}
