import React, { useState, useEffect } from 'react';
import AgentCard from './AgentCard';
import CrewCart from './CrewCart';
import './CrewBuilder.css';

const CrewBuilder = () => {
  const [agents, setAgents] = useState({});
  const [crew, setCrew] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchAgents();
  }, []);

  const fetchAgents = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/agents');
      
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
  };

  const addToCrew = (agentId) => {
    if (!crew.includes(agentId)) {
      setCrew([...crew, agentId]);
    }
  };

  const removeFromCrew = (agentId) => {
    setCrew(crew.filter(id => id !== agentId));
  };

  const handleLaunchCrew = () => {
    console.log('Launching crew with agents:', crew);
    // TODO: Implement crew launch logic
  };

  const formatAgentName = (id) => {
    return id.charAt(0).toUpperCase() + id.slice(1);
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
      <div className="crew-builder-header">
        <h2>Available Agents</h2>
        <p>Select agents to add to your crew</p>
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
          />
        </div>
      </div>
    </div>
  );
};

export default CrewBuilder;
