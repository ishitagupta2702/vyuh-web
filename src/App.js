import React from 'react';
import './App.css';
import CrewBuilder from './components/CrewBuilder.js';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Vyuh Crew Builder</h1>
        <p>Build and launch collaborative AI agent crews</p>
      </header>
      <main>
        <CrewBuilder />
      </main>
    </div>
  );
}

export default App;
