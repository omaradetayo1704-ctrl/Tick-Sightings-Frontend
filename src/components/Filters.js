import React from 'react';

const Filters = ({ filters, setFilters, speciesList, cities }) => {
  const handleFilterChange = (key, value) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const clearFilters = () => {
    setFilters({
      species: '',
      severity: '',
      startDate: '',
      endDate: '',
      city: ''
    });
  };

  return (
    <div className="filters-panel" style={{
      width: '250px',
      padding: '1rem',
      backgroundColor: '#f8f9fa',
      borderRight: '1px solid #dee2e6'
    }}>
      <h3>Filters</h3>
      
      <div className="form-group">
        <label>Species</label>
        <select 
          value={filters.species || ''} 
          onChange={(e) => handleFilterChange('species', e.target.value)}
        >
          <option value="">All Species</option>
          {speciesList.map(species => (
            <option key={species} value={species}>{species}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>City</label>
        <select 
          value={filters.city || ''} 
          onChange={(e) => handleFilterChange('city', e.target.value)}
        >
          <option value="">All Cities</option>
          {cities.map(city => (
            <option key={city} value={city}>{city}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Severity</label>
        <select 
          value={filters.severity || ''} 
          onChange={(e) => handleFilterChange('severity', e.target.value)}
        >
          <option value="">All Severities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label>Start Date</label>
        <input 
          type="date" 
          value={filters.startDate || ''} 
          onChange={(e) => handleFilterChange('startDate', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>End Date</label>
        <input 
          type="date" 
          value={filters.endDate || ''} 
          onChange={(e) => handleFilterChange('endDate', e.target.value)}
        />
      </div>

      <button onClick={clearFilters} className="btn btn-secondary">
        Clear Filters
      </button>

      <div style={{ 
        marginTop: '1rem', 
        padding: '0.5rem', 
        backgroundColor: '#e9ecef', 
        borderRadius: '4px',
        fontSize: '0.8rem'
      }}>
        <strong>Active Filters:</strong>
        <div style={{ marginTop: '0.5rem' }}>
          {filters.species && <div>✅ Species: {filters.species}</div>}
          {filters.city && <div>✅ City: {filters.city}</div>}
          {filters.severity && <div>✅ Severity: {filters.severity}</div>}
          {filters.startDate && <div>✅ From: {filters.startDate}</div>}
          {filters.endDate && <div>✅ To: {filters.endDate}</div>}
          {!filters.species && !filters.city && !filters.severity && !filters.startDate && !filters.endDate && (
            <div>No active filters</div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Filters;