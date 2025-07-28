import React, { useState } from 'react';
import axios from 'axios';
import './AgentRunner.css';

const AgentRunner = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState('');
  const [error, setError] = useState('');
  const [topic, setTopic] = useState('The future of content creation');

  const runAgent = async () => {
    setIsLoading(true);
    setError('');
    setResult('');

    try {
      const response = await axios.post('/run-agent', {
        topic: topic
      });

      setResult(response.data.result);
    } catch (err) {
      console.error('Error running agent:', err);
      setError(err.response?.data?.detail || 'Failed to run agent. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runAgent();
  };

  return (
    <div className="agent-runner">
      <div className="card">
        <h2>Run AI Agent</h2>
        <p>Generate content using your AI agent system</p>
        
        <form onSubmit={handleSubmit} className="form">
          <div className="input-group">
            <label htmlFor="topic">Topic:</label>
            <input
              type="text"
              id="topic"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter a topic for the agent to research..."
              disabled={isLoading}
            />
          </div>
          
          <button 
            type="submit" 
            className={`run-button ${isLoading ? 'loading' : ''}`}
            disabled={isLoading}
          >
            {isLoading ? 'Running Agent...' : 'Run Agent'}
          </button>
        </form>

        {error && (
          <div className="error">
            <h3>❌ Error</h3>
            <p>{error}</p>
          </div>
        )}

        {result && (
          <div className="result">
            <h3>Generated Content</h3>
            <div className="result-content">
              {result}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AgentRunner;