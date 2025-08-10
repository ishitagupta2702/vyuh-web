import React, { useState } from 'react';
import './CreateCrewTab.css';

export default function CreateCrewTab() {
    const [projectIdea, setProjectIdea] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [selectedAgents, setSelectedAgents] = useState([]);

    // Handler for project idea input changes
    const handleIdeaChange = (e) => {
        setProjectIdea(e.target.value);
    };

    // Handler for filter changes
    const handleFilterChange = (filter) => {
        setActiveFilter(filter);
    };

    // Handler for adding an agent to the crew
    const handleAddAgent = (agentId) => {
        if (!selectedAgents.includes(agentId)) {
            setSelectedAgents([...selectedAgents, agentId]);
        }
    };

    // Handler for removing an agent from the crew
    const handleRemoveAgent = (agentId) => {
        setSelectedAgents(selectedAgents.filter(id => id !== agentId));
    };

    return (
        <div className="create-crew-container">
            {/* Project Idea Section */}
            <div className="project-idea-section">
                <h3>What's Your Project Idea?</h3>
                <textarea
                    className="project-idea-input"
                    value={projectIdea}
                    onChange={handleIdeaChange}
                    placeholder="Describe your project idea, goals, or what you want to accomplish..."
                    rows={4}
                />
            </div>

            {/* Filter Section */}
            <div className="filter-section">
                <h4>Filter Agents by Role</h4>
                <div className="filter-buttons">
                    <button
                        className={`filter-btn ${activeFilter === 'all' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('all')}
                    >
                        All Roles
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'researcher' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('researcher')}
                    >
                        Researchers
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'writer' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('writer')}
                    >
                        Writers
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'analyst' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('analyst')}
                    >
                        Analysts
                    </button>
                    <button
                        className={`filter-btn ${activeFilter === 'creative' ? 'active' : ''}`}
                        onClick={() => handleFilterChange('creative')}
                    >
                        Creative
                    </button>
                </div>
            </div>

            {/* Agent Selection Section */}
            <div className="agent-selection-section">
                <h4>Available Agents</h4>
                <div className="agents-grid">
                    {/* This would be populated with actual agent data */}
                    <div className="agent-card" onClick={() => handleAddAgent('researcher-1')}>
                        <h5>Research Specialist</h5>
                        <p>Expert at gathering and analyzing information</p>
                        <span className="agent-role">Researcher</span>
                    </div>
                    <div className="agent-card" onClick={() => handleAddAgent('writer-1')}>
                        <h5>Content Writer</h5>
                        <p>Creates compelling written content</p>
                        <span className="agent-role">Writer</span>
                    </div>
                    <div className="agent-card" onClick={() => handleAddAgent('analyst-1')}>
                        <h5>Data Analyst</h5>
                        <p>Interprets data and provides insights</p>
                        <span className="agent-role">Analyst</span>
                    </div>
                    <div className="agent-card" onClick={() => handleAddAgent('creative-1')}>
                        <h5>Creative Director</h5>
                        <p>Generates innovative ideas and concepts</p>
                        <span className="agent-role">Creative</span>
                    </div>
                </div>
            </div>

            {/* Selected Crew Section */}
            <div className="selected-crew-section">
                <h4>Your Selected Crew ({selectedAgents.length})</h4>
                {selectedAgents.length === 0 ? (
                    <p className="no-agents-message">No agents selected yet. Click on agents above to add them to your crew.</p>
                ) : (
                    <div className="selected-agents-list">
                        {selectedAgents.map((agentId) => (
                            <div key={agentId} className="selected-agent-item">
                                <span className="agent-name">{agentId}</span>
                                <button
                                    className="remove-agent-btn"
                                    onClick={() => handleRemoveAgent(agentId)}
                                >
                                    Remove
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {/* Action Buttons */}
            <div className="action-buttons">
                <button 
                    className="create-crew-btn"
                    disabled={selectedAgents.length === 0 || !projectIdea.trim()}
                >
                    Create Crew
                </button>
                <button 
                    className="clear-all-btn"
                    onClick={() => {
                        setSelectedAgents([]);
                        setProjectIdea('');
                    }}
                >
                    Clear All
                </button>
            </div>
        </div>
    );
}