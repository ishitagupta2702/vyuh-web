import React, { useState } from 'react';
import './MyCrewsTab.css';

export default function MyCrewsTab() {
    const [crews, setCrews] = useState([
        {
            id: 'my-crew-1',
            name: 'Content Marketing Team',
            description: 'My go-to team for blog posts and social media',
            agents: ['Writer', 'Editor', 'Researcher'],
            createdAt: '2024-01-15',
            lastUsed: '2024-01-20',
            status: 'active'
        },
        {
            id: 'my-crew-2',
            name: 'Research Squad',
            description: 'Perfect for deep-dive research projects',
            agents: ['Researcher', 'Analyst', 'Data Scientist'],
            createdAt: '2024-01-10',
            lastUsed: '2024-01-18',
            status: 'active'
        },
        {
            id: 'my-crew-3',
            name: 'Creative Brainstorming',
            description: 'Great for ideation and concept development',
            agents: ['Creative Director', 'Designer', 'Copywriter'],
            createdAt: '2024-01-05',
            lastUsed: '2024-01-12',
            status: 'archived'
        }
    ]);

    const [editingCrew, setEditingCrew] = useState(null);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [crewToDelete, setCrewToDelete] = useState(null);
    const [filterStatus, setFilterStatus] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Handler for editing a crew
    const handleEditCrew = (crew) => {
        setEditingCrew({ ...crew });
    };

    // Handler for saving edits
    const handleSaveEdit = () => {
        if (editingCrew && editingCrew.name.trim()) {
            setCrews(crews.map(crew => 
                crew.id === editingCrew.id ? editingCrew : crew
            ));
            setEditingCrew(null);
        }
    };

    // Handler for canceling edits
    const handleCancelEdit = () => {
        setEditingCrew(null);
    };

    // Handler for deleting a crew
    const handleDeleteCrew = (crewId) => {
        setCrews(crews.filter(crew => crew.id !== crewId));
        setShowDeleteModal(false);
        setCrewToDelete(null);
    };

    // Handler for archiving/unarchiving a crew
    const handleToggleArchive = (crewId) => {
        setCrews(crews.map(crew => 
            crew.id === crewId 
                ? { ...crew, status: crew.status === 'active' ? 'archived' : 'active' }
                : crew
        ));
    };

    // Handler for duplicating a crew
    const handleDuplicateCrew = (crew) => {
        const newCrew = {
            ...crew,
            id: `my-crew-${Date.now()}`,
            name: `${crew.name} (Copy)`,
            createdAt: new Date().toISOString().split('T')[0],
            lastUsed: new Date().toISOString().split('T')[0]
        };
        setCrews([...crews, newCrew]);
    };

    // Filter crews based on status and search query
    const filteredCrews = crews.filter(crew => {
        const matchesStatus = filterStatus === 'all' || crew.status === filterStatus;
        const matchesSearch = crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            crew.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesStatus && matchesSearch;
    });

    return (
        <div className="my-crews-container">
            {/* Header Section */}
            <div className="header-section">
                <h3>My Crews</h3>
                <p>Manage and organize your custom crew combinations</p>
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search your crews..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="search-input"
                    />
                </div>
                
                <div className="filter-controls">
                    <select
                        value={filterStatus}
                        onChange={(e) => setFilterStatus(e.target.value)}
                        className="status-filter"
                    >
                        <option value="all">All Statuses</option>
                        <option value="active">Active</option>
                        <option value="archived">Archived</option>
                    </select>
                    
                    <span className="crew-count">
                        {filteredCrews.length} of {crews.length} crews
                    </span>
                </div>
            </div>

            {/* Crews List */}
            <div className="crews-list">
                {filteredCrews.length === 0 ? (
                    <div className="no-crews">
                        <p>No crews found matching your criteria.</p>
                        {crews.length === 0 && (
                            <button className="create-first-crew-btn">
                                Create Your First Crew
                            </button>
                        )}
                    </div>
                ) : (
                    filteredCrews.map(crew => (
                        <div key={crew.id} className={`crew-item ${crew.status}`}>
                            <div className="crew-info">
                                {editingCrew && editingCrew.id === crew.id ? (
                                    <div className="edit-form">
                                        <input
                                            type="text"
                                            value={editingCrew.name}
                                            onChange={(e) => setEditingCrew({
                                                ...editingCrew,
                                                name: e.target.value
                                            })}
                                            className="edit-name-input"
                                        />
                                        <textarea
                                            value={editingCrew.description}
                                            onChange={(e) => setEditingCrew({
                                                ...editingCrew,
                                                description: e.target.value
                                            })}
                                            className="edit-description-input"
                                            rows={2}
                                        />
                                        <div className="edit-actions">
                                            <button 
                                                className="save-btn"
                                                onClick={handleSaveEdit}
                                            >
                                                Save
                                            </button>
                                            <button 
                                                className="cancel-btn"
                                                onClick={handleCancelEdit}
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="crew-header">
                                            <h4>{crew.name}</h4>
                                            <span className={`status-badge ${crew.status}`}>
                                                {crew.status}
                                            </span>
                                        </div>
                                        <p className="crew-description">{crew.description}</p>
                                        <div className="crew-agents">
                                            <span className="agents-label">Agents:</span>
                                            {crew.agents.map((agent, index) => (
                                                <span key={index} className="agent-tag">{agent}</span>
                                            ))}
                                        </div>
                                        <div className="crew-meta">
                                            <span>Created: {crew.createdAt}</span>
                                            <span>Last used: {crew.lastUsed}</span>
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            {!editingCrew && (
                                <div className="crew-actions">
                                    <button 
                                        className="action-btn edit-btn"
                                        onClick={() => handleEditCrew(crew)}
                                    >
                                        Edit
                                    </button>
                                    <button 
                                        className="action-btn duplicate-btn"
                                        onClick={() => handleDuplicateCrew(crew)}
                                    >
                                        Duplicate
                                    </button>
                                    <button 
                                        className="action-btn archive-btn"
                                        onClick={() => handleToggleArchive(crew.id)}
                                    >
                                        {crew.status === 'active' ? 'Archive' : 'Unarchive'}
                                    </button>
                                    <button 
                                        className="action-btn delete-btn"
                                        onClick={() => {
                                            setCrewToDelete(crew);
                                            setShowDeleteModal(true);
                                        }}
                                    >
                                        Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    ))
                )}
            </div>

            {/* Delete Confirmation Modal */}
            {showDeleteModal && (
                <div className="modal-overlay">
                    <div className="delete-modal">
                        <h4>Delete Crew</h4>
                        <p>Are you sure you want to delete "{crewToDelete?.name}"? This action cannot be undone.</p>
                        <div className="modal-actions">
                            <button 
                                className="cancel-btn"
                                onClick={() => {
                                    setShowDeleteModal(false);
                                    setCrewToDelete(null);
                                }}
                            >
                                Cancel
                            </button>
                            <button 
                                className="delete-confirm-btn"
                                onClick={() => handleDeleteCrew(crewToDelete.id)}
                            >
                                Delete Crew
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}