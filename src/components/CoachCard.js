import React from 'react';

export default function CoachCard({ coach, onUnlockClick, disabled }) {
  return (
    <div className="card">
      <h4>
        {coach.name}{" "}
        {coach.red_flag ? <span className="red">[red flag]</span> : null}
      </h4>
      <p>{coach.description}</p>
      <p>
        Cost: {coach.cost} tokens • XP: {coach.xp_award}
      </p>
      <div style={{ display: 'flex', gap: 8 }}>
        {coach.unlocked ? (
          <button disabled>Unlocked</button>
        ) : (
          <button onClick={() => onUnlockClick(coach)} disabled={disabled}>
            Unlock
          </button>
        )}
      </div>
    </div>
  );
}
