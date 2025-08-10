import React, { useState, useEffect, useCallback } from 'react';
import AgentCard from './AgentCard';
import CrewCart from './CrewCart';
import { useAuth } from '../hooks/useAuth';
import './CrewBuilder.css';

const CrewBuilder = () => {
  const { currentUser } = useAuth();
  const [agents, setAgents] = useState({});
  const [crew, setCrew] = useState([]);
  const [topic, setTopic] = useState("");
  const [loading, setLoading] = useState(true);
  const [launchLoading, setLaunchLoading] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);
  const [result, setResult] = useState(null);
  const [launchResult, setLaunchResult] = useState(null);

  // Get backend URL from environment or use default
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://vyuh-backend-production.up.railway.app';

  const fetchAgents = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`${BACKEND_URL}/api/agents`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      setAgents(data);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch agents');
      console.error('Error fetching agents:', err);
    } finally {
      setLoading(false);
    }
  }, [BACKEND_URL]);

  useEffect(() => {
    fetchAgents();
  }, [fetchAgents]);

  const addToCrew = (agentId) => {
    if (!crew.includes(agentId)) {
      setCrew([...crew, agentId]);
    }
  };

  const removeFromCrew = (agentId) => {
    setCrew(crew.filter(id => id !== agentId));
  };

  const handleLaunchCrew = async () => {
    if (crew.length === 0) {
      alert('Please select at least one agent');
      return;
    }
    
    if (!topic.trim()) {
      alert('Please enter a topic');
      return;
    }

    try {
      setLaunchLoading(true);
      const payload = {
        crew: crew,
        topic: topic.trim()
      };
      
      const response = await fetch(`${BACKEND_URL}/api/launch`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload)
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || `HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setSessionId(data.session_id);
      setLaunchResult(data); // Store the complete launch response
      setResult(data.data); // Use the data field from the response
    } catch (err) {
      alert(`Error launching crew: ${err instanceof Error ? err.message : 'Failed to launch crew'}`);
    } finally {
      setLaunchLoading(false);
    }
  };

  const formatAgentName = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
  };

  const handleReset = () => {
    setCrew([]);
    setTopic("");
    setSessionId(null);
    setResult(null);
    setLaunchResult(null);
  };

  if (loading) {
    return (
      <div className="crew-builder">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Loading available agents...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="crew-builder">
        <div className="error-container">
          <h3>Error Loading Agents</h3>
          <p>{error}</p>
          <button onClick={fetchAgents} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="crew-builder">
      <header className="App-header">
        <div className="header-content">
          <div className="header-left">
            <h1>Vyuh Crew Builder</h1>
            <p>Build and launch collaborative AI agent crews</p>
          </div>
          <div className="header-right">
            <span className="user-info">
              Welcome, {currentUser?.displayName || currentUser?.email || 'User'}!
            </span>
          </div>
        </div>
      </header>
      
      <div className="crew-builder-header">
        <h2>Available Agents</h2>
        <p>Select agents to add to your crew</p>
      </div>
      
      <div className="topic-input-section">
        <label htmlFor="topic-input" className="topic-label">Your Idea</label>
        <textarea
          id="topic-input"
          className="topic-input"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder="Enter your topic or idea..."
          rows={3}
        />
      </div>
      
      <div className="crew-builder-content">
        <div className="agents-section">
          <div className="agents-grid">
            {Object.entries(agents).map(([id, agent]) => (
              <AgentCard
                key={id}
                id={id}
                name={formatAgentName(id)}
                role={agent.role}
                goal={agent.goal}
                onAdd={addToCrew}
              />
            ))}
          </div>
        </div>
        
        <div className="crew-section">
          <CrewCart
            crew={crew}
            onRemove={removeFromCrew}
            onLaunch={handleLaunchCrew}
            launchLoading={launchLoading}
            topic={topic}
          />
        </div>
      </div>

      {/* Result Display Section */}
      {(launchResult || result) && (
        <div className="result-section">
          <div className="result-header">
            <h3>Crew Execution Result</h3>
            {sessionId && <span className="session-id">Session: {sessionId}</span>}
            {launchResult && (
              <div className="result-info">
                <span className="topic-info">Topic: {launchResult.topic}</span>
                <span className="crew-info">Crew: {launchResult.crew?.join(', ')}</span>
              </div>
            )}
          </div>
          
          {launchLoading && !result && (
            <div className="result-loading">
              <div className="loading-spinner"></div>
              <p>Executing crew... This may take a few moments.</p>
            </div>
          )}
          
          {result && (
            <div className="result-content">
              <textarea
                className="result-textarea"
                value={result}
                readOnly
                rows={15}
                placeholder="Crew execution result will appear here..."
              />
              <div className="result-actions">
                <button onClick={handleReset} className="reset-btn">
                  Start Over
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CrewBuilder;
