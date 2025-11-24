import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';


delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});


const createCustomIcon = (color, size, letter, isReported = false) => {
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        background-color: ${color}; 
        width: ${size}; 
        height: ${size}; 
        border-radius: 50%; 
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        font-weight: bold;
        color: white;
        font-size: 10px;
        position: relative;
      ">
        ${letter}
        ${isReported ? '<div style="position: absolute; top: -5px; right: -5px; background: blue; width: 8px; height: 8px; border-radius: 50%; border: 1px solid white;"></div>' : ''}
      </div>
    `,
    iconSize: [parseInt(size), parseInt(size)],
    iconAnchor: [parseInt(size)/2, parseInt(size)/2],
  });
};

const Map = ({ sightings, onSightingClick, loading }) => {
 
  const getMarkerColor = (severity) => {
    switch (severity) {
      case 'high': return '#ff0000';
      case 'medium': return '#ff9900';
      case 'low': return '#00aa00';
      default: return '#666666';
    }
  };

  
  const getMarkerSize = (severity) => {
    switch (severity) {
      case 'high': return '25px';
      case 'medium': return '20px';
      case 'low': return '15px';
      default: return '15px';
    }
  };

  
  if (loading) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa'
      }}>
        <p>Loading map data...</p>
      </div>
    );
  }

  
  if (!loading && sightings.length === 0) {
    return (
      <div style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        alignItems: 'center', 
        justifyContent: 'center',
        backgroundColor: '#f8f9fa',
        padding: '2rem',
        textAlign: 'center'
      }}>
        <h3>No Tick Sightings Found</h3>
        <p>There are currently no tick sightings to display on the map.</p>
        <p>This could be because:</p>
        <ul style={{ textAlign: 'left', maxWidth: '400px' }}>
          <li>No sightings have been reported yet</li>
          <li>Your filters are hiding all sightings</li>
          <li>There's an issue with the data source</li>
        </ul>
        <p>Try reporting a sighting or checking back later!</p>
      </div>
    );
  }

  return (
    <div style={{ position: 'relative', height: '100%', width: '100%' }}>
      <MapContainer
        center={[54.5, -2.5]}
        zoom={6}
        style={{ height: '100%', width: '100%' }}
        key={sightings.length}
      >
        <LayersControl position="topright">
          <LayersControl.BaseLayer checked name="OpenStreetMap">
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          </LayersControl.BaseLayer>
          <LayersControl.BaseLayer name="Satellite">
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            />
          </LayersControl.BaseLayer>
        </LayersControl>

        {sightings.map((sighting) => {
          const color = getMarkerColor(sighting.severity);
          const size = getMarkerSize(sighting.severity);
          const isReported = sighting.source === 'reported';
          
          return (
            <Marker
              key={sighting.id}
              position={[sighting.latitude, sighting.longitude]}
              icon={createCustomIcon(color, size, sighting.species.charAt(0), isReported)}
              eventHandlers={{
                click: () => onSightingClick(sighting),
              }}
            >
              <Popup>
                <div style={{ minWidth: '200px' }}>
                  <h4 style={{ margin: '0 0 8px 0', color: color }}>
                    {sighting.species}
                    {isReported && <span style={{color: 'blue', fontSize: '12px', marginLeft: '5px'}}>(Reported)</span>}
                  </h4>
                  <p style={{ margin: '4px 0', fontSize: '12px', color: '#666' }}>
                    <em>{sighting.latinName}</em>
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Severity:</strong> 
                    <span style={{ 
                      color: color,
                      fontWeight: 'bold',
                      marginLeft: '5px'
                    }}>
                      {sighting.severity.toUpperCase()}
                    </span>
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Date:</strong> {new Date(sighting.date).toLocaleDateString()}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>Location:</strong> {sighting.location}
                  </p>
                  <p style={{ margin: '4px 0' }}>
                    <strong>City:</strong> {sighting.city}
                  </p>
                  <button 
                    onClick={() => onSightingClick(sighting)}
                    style={{
                      backgroundColor: color,
                      color: 'white',
                      border: 'none',
                      padding: '5px 10px',
                      borderRadius: '3px',
                      cursor: 'pointer',
                      marginTop: '8px',
                      width: '100%'
                    }}
                  >
                    View Details
                  </button>
                </div>
              </Popup>
            </Marker>
          );
        })}
      </MapContainer>

      
      <div style={{
        position: 'absolute',
        bottom: '20px',
        left: '20px',
        backgroundColor: 'white',
        padding: '15px',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        minWidth: '220px'
      }}>
        <h4 style={{ margin: '0 0 10px 0' }}>Tick Sighting Legend</h4>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            backgroundColor: '#ff0000',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            border: '2px solid white',
            marginRight: '10px'
          }}></div>
          <span>High Severity</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            backgroundColor: '#ff9900',
            width: '16px',
            height: '16px',
            borderRadius: '50%',
            border: '2px solid white',
            marginRight: '10px'
          }}></div>
          <span>Medium Severity</span>
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            backgroundColor: '#00aa00',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid white',
            marginRight: '10px'
          }}></div>
          <span>Low Severity</span>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '8px' }}>
          <div style={{
            backgroundColor: '#00aa00',
            width: '12px',
            height: '12px',
            borderRadius: '50%',
            border: '2px solid white',
            marginRight: '10px',
            position: 'relative'
          }}>
            <div style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              backgroundColor: 'blue',
              width: '6px',
              height: '6px',
              borderRadius: '50%',
              border: '1px solid white'
            }}></div>
          </div>
          <span>Your Reported Sightings</span>
        </div>

        <div style={{ 
          marginTop: '10px', 
          padding: '8px', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '3px',
          fontSize: '12px'
        }}>
          <strong>Total sightings:</strong> {sightings.length}
          <br />
          <strong>API data:</strong> {sightings.filter(s => s.source === 'api').length}
          <br />
          <strong>Your reports:</strong> {sightings.filter(s => s.source === 'reported').length}
        </div>
      </div>

      
      <div style={{
        position: 'absolute',
        top: '20px',
        right: '20px',
        backgroundColor: sightings.length > 0 ? '#dc3545' : '#28a745',
        color: 'white',
        padding: '10px 15px',
        borderRadius: '5px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.3)',
        zIndex: 1000,
        fontWeight: 'bold'
      }}>
        {sightings.length > 0 
          ? `🚨 ${sightings.length} Tick Sightings Reported`
          : '✅ No Tick Sightings in Area'
        }
      </div>
    </div>
  );
};

export default Map;