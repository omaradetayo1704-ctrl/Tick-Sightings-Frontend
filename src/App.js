import React, { useState, useEffect } from 'react';
import Map from './components/Map';
import Filters from './components/Filters';
import SightingDetails from './components/SightingDetails';
import ReportForm from './components/ReportForm';
import Education from './components/Education';
import { cityCoordinates } from './utils/cityCoordinates';
import './App.css';

function App() {
  const [apiSightings, setApiSightings] = useState([]);
  const [reportedSightings, setReportedSightings] = useState([]);
  const [filteredSightings, setFilteredSightings] = useState([]);
  const [selectedSighting, setSelectedSighting] = useState(null);
  const [showReportForm, setShowReportForm] = useState(false);
  const [showEducation, setShowEducation] = useState(false);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    species: '',
    severity: '',
    startDate: '',
    endDate: '',
    city: ''
  });

  // UK cities for the dropdown
  const ukCities = Object.keys(cityCoordinates);

  // Predefined tick species - only these are allowed
  const allowedSpecies = [
    'Southern rodent tick',
    'Marsh tick', 
    'Sheep tick',
    'Hedgehog tick'
  ];

  // Generate coordinates within a specific city area
  const getCoordinatesInCity = (city) => {
    const baseCoords = cityCoordinates[city] || cityCoordinates['London'];
    
    // Add some random variation within the city area (±0.1 degrees ≈ 11km)
    const lat = baseCoords.lat + (Math.random() * 0.2 - 0.1);
    const lng = baseCoords.lng + (Math.random() * 0.2 - 0.1);
    
    return { lat, lng };
  };

  // Get a diverse set of UK cities for distribution
  const getDistributedCities = (count) => {
    const majorCities = [
      'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow',
      'Liverpool', 'Bristol', 'Leeds', 'Sheffield', 'Newcastle',
      'Cardiff', 'Belfast', 'Nottingham', 'Leicester', 'Coventry',
      'Hull', 'Plymouth', 'Brighton', 'Southampton', 'Portsmouth',
      'Norwich', 'Exeter', 'Aberdeen', 'Dundee', 'Inverness'
    ];
    
    const distributedCities = [];
    for (let i = 0; i < count; i++) {
      const city = majorCities[i % majorCities.length];
      distributedCities.push(city);
    }
    return distributedCities;
  };

  // Fetch data from Elanco API
  useEffect(() => {
    const fetchSightings = async () => {
      try {
        setLoading(true);
        console.log('Fetching data from API...');
        
        const response = await fetch('https://dev-task.elancoapps.com/data/tick-sightings');
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const data = await response.json();
        console.log('Raw API data received:', data);
        
        // Get a distributed list of cities for all sightings
        const distributedCities = getDistributedCities(data.length);
        
        // Transform API data to match our format with distributed coordinates
        const transformedData = data.map((sighting, index) => {
          const assignedCity = distributedCities[index];
          const coords = getCoordinatesInCity(assignedCity);
          
          console.log(`Sighting ${index}: Assigned to "${assignedCity}" with coords:`, coords);
          
          return {
            id: `api-${index}-${Date.now()}`,
            species: sighting.species || 'Unknown species',
            latinName: sighting.latinName || 'Unknown latin name',
            date: sighting.date || new Date().toISOString(),
            city: assignedCity,
            location: assignedCity,
            description: `${sighting.species} (${sighting.latinName}) spotted in ${assignedCity}`,
            severity: getRandomSeverity(),
            latitude: coords.lat,
            longitude: coords.lng,
            source: 'api',
            rawData: sighting
          };
        });
        
        console.log(`Transformed ${transformedData.length} sightings from API`);
        console.log('City distribution:', distributedCities.reduce((acc, city) => {
          acc[city] = (acc[city] || 0) + 1;
          return acc;
        }, {}));
        
        setApiSightings(transformedData);
      } catch (error) {
        console.error('Error fetching sightings:', error);
        // Use comprehensive sample data with different cities
        setApiSightings(getSampleData());
      } finally {
        setLoading(false);
      }
    };

    fetchSightings();
  }, []);

  // Load reported sightings from localStorage on component mount
  useEffect(() => {
    const savedSightings = localStorage.getItem('reportedTickSightings');
    if (savedSightings) {
      try {
        const parsedSightings = JSON.parse(savedSightings);
        setReportedSightings(parsedSightings);
        console.log('Loaded reported sightings:', parsedSightings.length);
      } catch (error) {
        console.error('Error loading reported sightings:', error);
      }
    }
  }, []);

  // Combine API sightings and reported sightings, then apply filters
  useEffect(() => {
    const allSightings = [...apiSightings, ...reportedSightings];
    let filtered = allSightings;

    if (filters.species) {
      filtered = filtered.filter(s => 
        s.species && s.species.toLowerCase().includes(filters.species.toLowerCase())
      );
    }

    if (filters.severity) {
      filtered = filtered.filter(s => s.severity === filters.severity);
    }

    if (filters.startDate) {
      filtered = filtered.filter(s => {
        try {
          return new Date(s.date) >= new Date(filters.startDate);
        } catch {
          return false;
        }
      });
    }

    if (filters.endDate) {
      filtered = filtered.filter(s => {
        try {
          return new Date(s.date) <= new Date(filters.endDate);
        } catch {
          return false;
        }
      });
    }

    if (filters.city) {
      filtered = filtered.filter(s => 
        s.city && s.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    console.log(`Filtered ${filtered.length} sightings from ${allSightings.length} total`);
    setFilteredSightings(filtered);
  }, [filters, apiSightings, reportedSightings]);

  // Function to add a new reported sighting
  const addReportedSighting = (newSighting) => {
    const coords = getCoordinatesInCity(newSighting.location);
    
    const sightingWithCoords = {
      ...newSighting,
      id: `reported-${Date.now()}`,
      latitude: coords.lat,
      longitude: coords.lng,
      city: newSighting.location,
      source: 'reported'
    };

    const updatedSightings = [...reportedSightings, sightingWithCoords];
    setReportedSightings(updatedSightings);
    
    // Save to localStorage
    localStorage.setItem('reportedTickSightings', JSON.stringify(updatedSightings));
    console.log('Added new reported sighting:', sightingWithCoords);
  };

  // Helper functions
  const getRandomSeverity = () => {
    const severities = ['low', 'medium', 'high'];
    return severities[Math.floor(Math.random() * severities.length)];
  };

  const getSampleData = () => {
    const sampleSightings = [];
    const cities = Object.keys(cityCoordinates);
    
    // Create 50 sample sightings spread across different cities
    for (let i = 0; i < 50; i++) {
      const randomCity = cities[Math.floor(Math.random() * cities.length)];
      const coords = getCoordinatesInCity(randomCity);
      
      const randomSpecies = allowedSpecies[Math.floor(Math.random() * allowedSpecies.length)];
      
      sampleSightings.push({
        id: `sample-${i}`,
        species: randomSpecies,
        latinName: getLatinName(randomSpecies),
        date: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(),
        city: randomCity,
        location: randomCity,
        description: `${randomSpecies} (${getLatinName(randomSpecies)}) spotted in ${randomCity}`,
        severity: getRandomSeverity(),
        latitude: coords.lat,
        longitude: coords.lng,
        source: 'api'
      });
    }
    
    return sampleSightings;
  };

  // Helper function to get latin name for species
  const getLatinName = (species) => {
    const latinNames = {
      'Southern rodent tick': 'Ixodes acuminatus',
      'Marsh tick': 'Dermacentor reticulatus',
      'Sheep tick': 'Ixodes ricinus',
      'Hedgehog tick': 'Ixodes hexagonus'
    };
    return latinNames[species] || 'Unknown latin name';
  };

  const refreshData = () => {
    window.location.reload();
  };

  return (
    <div className="App">
      <header className="app-header">
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%' }}>
          <h1>UK Tick Tracker</h1>
          <nav>
            <button 
              onClick={() => {setShowReportForm(false); setShowEducation(false);}}
              className={!showReportForm && !showEducation ? 'active' : ''}
            >
              Map View
            </button>
            <button 
              onClick={() => {setShowReportForm(true); setShowEducation(false);}}
              className={showReportForm ? 'active' : ''}
            >
              Report Sighting
            </button>
            <button 
              onClick={() => {setShowEducation(true); setShowReportForm(false);}}
              className={showEducation ? 'active' : ''}
            >
              Education
            </button>
            <button 
              onClick={refreshData}
              className="btn-refresh"
              title="Refresh data from API"
            >
              🔄 Refresh
            </button>
          </nav>
        </div>
      </header>

      {loading && (
        <div className="loading">
          <p>Loading tick sightings data from API...</p>
        </div>
      )}

      {!showReportForm && !showEducation ? (
        <div className="main-content">
          <Filters 
            filters={filters} 
            setFilters={setFilters}
            speciesList={allowedSpecies} // Use predefined species instead of dynamic list
            cities={ukCities}
          />
          <div className="map-container">
            <Map 
              sightings={filteredSightings} 
              onSightingClick={setSelectedSighting}
              loading={loading}
            />
            {selectedSighting && (
              <SightingDetails 
                sighting={selectedSighting}
                onClose={() => setSelectedSighting(null)}
                onReportClick={() => setShowReportForm(true)}
              />
            )}
          </div>
        </div>
      ) : showReportForm ? (
        <ReportForm 
          onCancel={() => setShowReportForm(false)}
          onSubmit={addReportedSighting}
          cities={ukCities}
          allowedSpecies={allowedSpecies} // Pass predefined species to form
        />
      ) : (
        <Education 
          onBack={() => setShowEducation(false)} 
          sightings={[...apiSightings, ...reportedSightings]} 
        />
      )}
    </div>
  );
}

export default App;