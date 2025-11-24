import React, { useState } from 'react';
import SpeciesGuide from './SpeciesGuide';
import PreventionTips from './PreventionTips';
import SeasonalChart from './SeasonalChart';

const Education = ({ onBack, sightings }) => {
  const [activeTab, setActiveTab] = useState('species');

  
  const safeSightings = Array.isArray(sightings) ? sightings : [];

  return (
    <div style={{ padding: '2rem', maxWidth: '1000px', margin: '0 auto', textAlign: 'left', minHeight: '80vh' }}>
      <button onClick={onBack} className="btn btn-secondary" style={{ marginBottom: '1rem' }}>
        ← Back to Map
      </button>

      <h1 style={{ color: '#2c5aa0', marginBottom: '1.5rem' }}>Tick Education & Resources</h1>

      
      <div className="tabs" style={{ 
        marginBottom: '2rem',
        display: 'flex',
        gap: '0.5rem',
        flexWrap: 'wrap'
      }}>
        <button 
          className={activeTab === 'species' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveTab('species')}
          style={{ minWidth: '120px' }}
        >
          🐛 Species Guide
        </button>
        <button 
          className={activeTab === 'prevention' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveTab('prevention')}
          style={{ minWidth: '120px' }}
        >
          🛡️ Prevention Tips
        </button>
        <button 
          className={activeTab === 'seasonal' ? 'btn btn-primary' : 'btn btn-secondary'}
          onClick={() => setActiveTab('seasonal')}
          style={{ minWidth: '120px' }}
        >
          📊 Seasonal Activity
        </button>
      </div>

      
      <div style={{ minHeight: '500px' }}>
        {activeTab === 'species' && <SpeciesGuide />}
        {activeTab === 'prevention' && <PreventionTips />}
        {activeTab === 'seasonal' && <SeasonalChart sightings={safeSightings} />}
      </div>
    </div>
  );
};

export default Education;