import React from 'react';

const SightingDetails = ({ sighting, onClose, onReportClick }) => {
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Sighting Details</h2>

        <div className="sighting-info">
          <p><strong>Species:</strong> {sighting.species}</p>
          <p><strong>Latin Name:</strong> {sighting.latinName}</p>
          <p><strong>Severity:</strong> 
            <span style={{ 
              color: sighting.severity === 'high' ? '#dc3545' : 
                     sighting.severity === 'medium' ? '#ff9900' : '#28a745',
              fontWeight: 'bold',
              marginLeft: '5px'
            }}>
              {sighting.severity.toUpperCase()}
            </span>
          </p>
          <p><strong>Date:</strong> {new Date(sighting.date).toLocaleDateString()}</p>
          <p><strong>Time:</strong> {new Date(sighting.date).toLocaleTimeString()}</p>
          <p><strong>Location:</strong> {sighting.location}</p>
          <p><strong>City:</strong> {sighting.city}</p>
          <p><strong>Description:</strong> {sighting.description}</p>
          <p><strong>Source:</strong> 
            <span style={{ 
              color: sighting.source === 'api' ? '#28a745' : '#007bff',
              fontWeight: 'bold',
              marginLeft: '5px'
            }}>
              {sighting.source === 'api' ? 'API Data' : 'User Reported'}
            </span>
          </p>

          
          {sighting.rawData && (
            <div style={{ 
              marginTop: '1rem', 
              padding: '1rem', 
              backgroundColor: '#f8f9fa', 
              borderRadius: '4px',
              border: '1px solid #dee2e6'
            }}>
              <h4>Raw API Data</h4>
              <pre style={{ 
                fontSize: '0.8rem', 
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {JSON.stringify(sighting.rawData, null, 2)}
              </pre>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button className="btn btn-primary" onClick={onReportClick}>
            Report Similar Sighting
          </button>
          <button className="btn btn-secondary">
            Get Directions
          </button>
          <button className="btn btn-secondary">
            Share
          </button>
          <button className="btn btn-danger" onClick={onClose}>
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default SightingDetails;