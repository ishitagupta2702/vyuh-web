import React, { useState, useEffect } from 'react';
import {
    PlusCircleIcon,
    MagnifyingGlassIcon,
    PencilSquareIcon,
    ChartBarIcon,
    CodeBracketIcon,
    UsersIcon,
    CheckIcon,
    XMarkIcon,
    DocumentArrowDownIcon,
    RocketLaunchIcon
} from '@heroicons/react/24/outline';
import './CreateCrewTab.css';

export default function CreateCrewTab() {
  console.log('CreateCrewTab component mounted');
  
  const [projectIdea, setProjectIdea] = useState('');
  const [availableAgents, setAvailableAgents] = useState([]);
  const [selectedAgents, setSelectedAgents] = useState([]);
  const [activeFilter, setActiveFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [availableCategories, setAvailableCategories] = useState([]);
  
  // Launch crew state variables
  const [launchLoading, setLaunchLoading] = useState(false);
  const [sessionId, setSessionId] = useState(null);
  const [launchResult, setLaunchResult] = useState(null);
  const [result, setResult] = useState(null);

  // Get backend URL from environment or use default
  const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://vyuh-backend-production.up.railway.app';

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${BACKEND_URL}/api/agents`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Raw API response:', data);
        
        // Transform the object format to array format for the UI
        const agentsArray = Object.entries(data).map(([id, agent]) => ({
          id,
          name: id.charAt(0).toUpperCase() + id.slice(1), // Capitalize first letter
          role: agent.role,
          goal: agent.goal,
          backstory: agent.backstory,
          category: agent.category || 'general', // Use category if provided, fallback to general
          description: agent.role,
          skills: agent.skills || [agent.goal] // Use skills if provided, fallback to goal
        }));
        
        console.log('Transformed agents:', agentsArray);
        setAvailableAgents(agentsArray);
        
        // Extract unique categories from the agents
        const categories = [...new Set(agentsArray.map(agent => agent.category))];
        console.log('Available categories:', categories);
        setAvailableCategories(categories);
        
        setError(null);
      } catch (error) {
        console.error('Failed to fetch agents:', error);
        setError('Failed to load agents. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    fetchAgents();
  }, []);

  const handleAddAgent = (agent) => {
    if (!selectedAgents.some(a => a.id === agent.id)) {
      setSelectedAgents([...selectedAgents, agent]);
    }
  };

  const handleRemoveAgent = (agentId) => {
    setSelectedAgents(selectedAgents.filter(agent => agent.id !== agentId));
  };

  const getAgentIcon = (category) => {
    // Generate a consistent icon based on the category string
    if (!category) return <UsersIcon className="h-6 w-6" />;
    
    const icons = [
      <MagnifyingGlassIcon className="h-6 w-6" />, // research
      <PencilSquareIcon className="h-6 w-6" />,   // content
      <ChartBarIcon className="h-6 w-6" />,       // analysis
      <CodeBracketIcon className="h-6 w-6" />,    // development
      <UsersIcon className="h-6 w-6" />           // general
    ];
    
    // Use the category string to generate a consistent index
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = ((hash << 5) - hash + category.charCodeAt(i)) & 0xffffffff;
    }
    return icons[Math.abs(hash) % icons.length];
  };



  const getCategoryColor = (category) => {
    // Generate a consistent color based on the category string
    if (!category) return 'bg-gray-600';
    
    const colors = [
      'bg-blue-600', 'bg-green-600', 'bg-orange-600', 'bg-purple-600',
      'bg-red-600', 'bg-indigo-600', 'bg-pink-600', 'bg-yellow-600',
      'bg-teal-600', 'bg-cyan-600'
    ];
    
    // Use the category string to generate a consistent index
    let hash = 0;
    for (let i = 0; i < category.length; i++) {
      hash = ((hash << 5) - hash + category.charCodeAt(i)) & 0xffffffff;
    }
    return colors[Math.abs(hash) % colors.length];
  };

  const filteredAgents = activeFilter === 'all'
    ? availableAgents
    : availableAgents.filter(agent => agent.category?.toLowerCase() === activeFilter);
    
  console.log('Filtered agents:', filteredAgents, 'Active filter:', activeFilter);
  console.log('Available agents count:', availableAgents.length);
  console.log('Loading state:', loading);
  console.log('Error state:', error);

  const isLaunchDisabled = selectedAgents.length === 0 || projectIdea.trim() === '';

  const handleLaunchCrew = async () => {
    if (selectedAgents.length === 0) {
      alert('Please select at least one agent');
      return;
    }
    
    if (!projectIdea.trim()) {
      alert('Please enter a project idea');
      return;
    }

    try {
      setLaunchLoading(true);
      const payload = {
        crew: selectedAgents.map(agent => agent.id),
        topic: projectIdea.trim()
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

  const handleReset = () => {
    setSelectedAgents([]);
    setProjectIdea('');
    setSessionId(null);
    setResult(null);
    setLaunchResult(null);
  };

  return (
    <div className="create-crew-container">
      <header className="crew-builder-header">
        <h2>Create Your AI Crew</h2>
        <p>Build a custom team of AI agents tailored to your specific needs</p>
        {/* Debug: Component rendered, agents count: {availableAgents.length} */}
      </header>

      <div className="crew-builder-content">
        <section className="idea-section">
          <h3>Describe Your Project</h3>
          <div className="input-group">
            <label htmlFor="project-idea">What do you want your AI crew to accomplish?</label>
            <textarea 
              id="project-idea" 
              className="idea-textarea" 
              rows="5" 
              placeholder="Describe your project, goals, and requirements in detail..."
              value={projectIdea}
              onChange={(e) => setProjectIdea(e.target.value)}
            ></textarea>
          </div>
        </section>

        <section className="agent-selection-section">
          <div className="section-header">
            <h3>Available Agents</h3>
            <div className="agent-filters">
              <button 
                className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                onClick={() => setActiveFilter('all')}
              >All</button>
              {availableCategories.map(category => (
                <button 
                  key={category}
                  className={`filter-btn ${activeFilter === category ? 'active' : ''}`}
                  onClick={() => setActiveFilter(category)}
                >
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </button>
              ))}
            </div>
          </div>
          
          {loading && (
            <div className="loading-state">
              <p>Loading agents...</p>
            </div>
          )}
          
          {error && (
            <div className="error-state">
              <p>{error}</p>
            </div>
          )}
          
          {!loading && !error && (
            <div className="agents-grid">
              {filteredAgents.map(agent => (
                <div className="agent-card" key={agent.id} data-category={agent.category}>
                  <div className="agent-header">
                    <div className="agent-avatar">
                      {getAgentIcon(agent.category)}
                    </div>
                    <div className="agent-info">
                      <h4>{agent.name}</h4>
                      <span className={`agent-tag ${getCategoryColor(agent.category)}`}>
                        {agent.category?.toUpperCase() || 'GENERAL'}
                      </span>
                    </div>
                  </div>
                  <p className="agent-description">{agent.description || agent.role || 'AI agent specialized in various tasks.'}</p>
                  <div className="agent-skills">
                    {agent.skills && agent.skills.map(skill => (
                      <span className="skill-tag" key={skill}>{skill}</span>
                    ))}
                    {!agent.skills && agent.goal && (
                      <span className="skill-tag">{agent.goal}</span>
                    )}
                  </div>
                  <button 
                    className="add-agent-btn"
                    onClick={() => handleAddAgent(agent)}
                    disabled={selectedAgents.some(a => a.id === agent.id)}
                  >
                    {selectedAgents.some(a => a.id === agent.id) ? 
                      <><CheckIcon scale={0.5} /> Added</> : 
                      <><PlusCircleIcon /> Add to Crew</>
                    }
                  </button>
                </div>
              ))}
            </div>
          )}
        </section>

        <section className="selected-crew-section">
          <h3>Your Crew</h3>
          <div className="selected-crew-container">
            <div id="selected-crew-members" className="crew-members">
              {selectedAgents.length === 0 ? (
                <div className="empty-crew">
                  <UsersIcon className="h-8 w-8" />
                  <p>No agents selected yet</p>
                  <span>Add agents from the list above to build your crew</span>
                </div>
              ) : (
                selectedAgents.map(agent => (
                  <div className="crew-member" key={agent.id}>
                    <div className="member-info">
                      <div className="member-avatar">
                        {getAgentIcon(agent.category)}
                      </div>
                      <span className="member-name">{agent.name}</span>
                    </div>
                    <button 
                      className="remove-member"
                      onClick={() => handleRemoveAgent(agent.id)}
                    >
                      <XMarkIcon className="h-4 w-4" />
                    </button>
                  </div>
                ))
              )}
            </div>
            <div className="crew-actions">
              <button className="save-crew-btn" disabled={selectedAgents.length === 0}>
                <DocumentArrowDownIcon className="h-5 w-5" /> Save Crew
              </button>
              <button className="launch-crew-btn" disabled={isLaunchDisabled} onClick={handleLaunchCrew}>
                {launchLoading ? 'Launching...' : <><RocketLaunchIcon className="h-5 w-5" /> Launch Crew</>}
              </button>
            </div>
          </div>
        </section>
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
}
