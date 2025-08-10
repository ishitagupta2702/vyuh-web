import React, { useState } from 'react';
import './PrebuiltCrewsTab.css';

export default function PrebuiltCrewsTab() {
    const [activeCategory, setActiveCategory] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');

    // Handler for category filter changes
    const handleCategoryChange = (category) => {
        setActiveCategory(category);
    };

    // Handler for search query changes
    const handleSearchChange = (e) => {
        setSearchQuery(e.target.value);
    };

    // Mock data for prebuilt crews
    const prebuiltCrews = [
        {
            id: 'crew-1',
            name: 'Content Creation Team',
            category: 'content',
            description: 'Perfect for blog posts, articles, and social media content',
            agents: ['Writer', 'Editor', 'Researcher'],
            rating: 4.8,
            useCount: 1250
        },
        {
            id: 'crew-2',
            name: 'Research & Analysis',
            category: 'research',
            description: 'Ideal for market research, data analysis, and reports',
            agents: ['Researcher', 'Analyst', 'Data Scientist'],
            rating: 4.9,
            useCount: 890
        },
        {
            id: 'crew-3',
            name: 'Creative Design Squad',
            category: 'creative',
            description: 'Best for branding, design concepts, and creative projects',
            agents: ['Creative Director', 'Designer', 'Copywriter'],
            rating: 4.7,
            useCount: 650
        },
        {
            id: 'crew-4',
            name: 'Marketing Team',
            category: 'marketing',
            description: 'Optimized for campaigns, strategies, and growth',
            agents: ['Marketer', 'Analyst', 'Content Creator'],
            rating: 4.6,
            useCount: 1100
        },
        {
            id: 'crew-5',
            name: 'Product Development',
            category: 'product',
            description: 'Great for product research, planning, and development',
            agents: ['Product Manager', 'Researcher', 'Analyst'],
            rating: 4.8,
            useCount: 750
        }
    ];

    // Filter crews based on active category and search query
    const filteredCrews = prebuiltCrews.filter(crew => {
        const matchesCategory = activeCategory === 'all' || crew.category === activeCategory;
        const matchesSearch = crew.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                            crew.description.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

    return (
        <div className="prebuilt-crews-container">
            {/* Header Section */}
            <div className="header-section">
                <h3>Prebuilt Crews</h3>
                <p>Choose from our curated collection of proven crew combinations</p>
            </div>

            {/* Search and Filter Section */}
            <div className="search-filter-section">
                <div className="search-box">
                    <input
                        type="text"
                        placeholder="Search crews..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        className="search-input"
                    />
                </div>
                
                <div className="category-filters">
                    <button
                        className={`category-btn ${activeCategory === 'all' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('all')}
                    >
                        All Categories
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'content' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('content')}
                    >
                        Content
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'research' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('research')}
                    >
                        Research
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'creative' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('creative')}
                    >
                        Creative
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'marketing' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('marketing')}
                    >
                        Marketing
                    </button>
                    <button
                        className={`category-btn ${activeCategory === 'product' ? 'active' : ''}`}
                        onClick={() => handleCategoryChange('product')}
                    >
                        Product
                    </button>
                </div>
            </div>

            {/* Crews Grid */}
            <div className="crews-grid">
                {filteredCrews.length === 0 ? (
                    <div className="no-results">
                        <p>No crews found matching your criteria.</p>
                        <button 
                            className="clear-filters-btn"
                            onClick={() => {
                                setActiveCategory('all');
                                setSearchQuery('');
                            }}
                        >
                            Clear Filters
                        </button>
                    </div>
                ) : (
                    filteredCrews.map(crew => (
                        <div key={crew.id} className="crew-card">
                            <div className="crew-header">
                                <h4>{crew.name}</h4>
                                <div className="crew-rating">
                                    <span className="stars">★★★★★</span>
                                    <span className="rating-text">{crew.rating}</span>
                                </div>
                            </div>
                            
                            <p className="crew-description">{crew.description}</p>
                            
                            <div className="crew-agents">
                                <h5>Agents:</h5>
                                <div className="agent-tags">
                                    {crew.agents.map((agent, index) => (
                                        <span key={index} className="agent-tag">{agent}</span>
                                    ))}
                                </div>
                            </div>
                            
                            <div className="crew-stats">
                                <span className="use-count">Used {crew.useCount} times</span>
                            </div>
                            
                            <div className="crew-actions">
                                <button className="use-crew-btn">Use This Crew</button>
                                <button className="preview-crew-btn">Preview</button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Results Summary */}
            <div className="results-summary">
                <p>Showing {filteredCrews.length} of {prebuiltCrews.length} crews</p>
            </div>
        </div>
    );
}