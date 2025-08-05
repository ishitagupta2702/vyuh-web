import React from 'react';
import './App.css';
import { AuthProvider } from './contexts/AuthContext';
import Auth from './components/Auth';
import CrewBuilder from './components/CrewBuilder.js';
import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const { currentUser, logout } = useAuth();

  return (
    <div className="App">
      <header className="App-header">
        <h1>Vyuh Crew Builder</h1>
        <p>Build and launch collaborative AI agent crews</p>
        {currentUser && (
          <div className="user-info">
            <span>Welcome, {currentUser.email}</span>
            <button onClick={logout} className="logout-btn">Logout</button>
          </div>
        )}
      </header>
      <main>
        {currentUser ? <CrewBuilder /> : <Auth />}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
