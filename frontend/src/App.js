import React from 'react';
import './App.css';
import AgentRunner from './components/AgentRunner';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vyuh AI Agent</h1>
        <p>AI Agent System MVP</p>
      </header>
      <main>
        <AgentRunner />
      </main>
    </div>
  );
}

export default App;
