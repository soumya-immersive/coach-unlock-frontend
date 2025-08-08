// src/App.js
import React from 'react';
import { UserProvider } from './contexts/UserContext';
import CoachList from './components/CoachList';
import './styles.css';

function App() {
  return (
    <UserProvider>
      <div className="container">
        <h2>Coaches</h2>
        <CoachList />
      </div>
    </UserProvider>
  );
}

export default App;
