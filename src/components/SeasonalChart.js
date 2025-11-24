import React, { useState, useMemo } from 'react';

const SeasonalChart = ({ sightings }) => {
  const [selectedCity, setSelectedCity] = useState('London');
  const [selectedYear, setSelectedYear] = useState('2024');

 
  const cities = useMemo(() => {
    console.log('All sightings for cities:', sightings);
    
    
    const citySet = new Set();
    
    sightings.forEach(sighting => {
      
      const city = sighting.city || sighting.location;
      if (city && typeof city === 'string' && city.trim() !== '') {
        citySet.add(city.trim());
      }
    });
    
    const citiesArray = Array.from(citySet).sort();
    console.log('Available cities:', citiesArray);
    
    
    return citiesArray.length > 0 ? citiesArray : [
      'London', 'Manchester', 'Birmingham', 'Edinburgh', 'Glasgow', 
      'Liverpool', 'Bristol', 'Oxford', 'Cambridge', 'Leeds', 
      'Sheffield', 'York', 'Newcastle', 'Cardiff', 'Belfast'
    ];
  }, [sightings]);

 
  const years = useMemo(() => {
    const startYear = 2012;
    const endYear = 2025;
    
    
    const yearsArray = [];
    for (let year = endYear; year >= startYear; year--) {
      yearsArray.push(year);
    }
    
    console.log('Available years:', yearsArray);
    return yearsArray;
  }, []);

  
  const chartData = useMemo(() => {
    const monthlyData = Array(12).fill(0);
    
    console.log('Filtering for city:', selectedCity, 'year:', selectedYear);
    
    sightings
      .filter(sighting => {
        if (!sighting.date) return false;
        
        
        const sightingCity = sighting.city || sighting.location;
        if (!sightingCity) return false;
        
        let sightingYear;
        try {
          sightingYear = new Date(sighting.date).getFullYear().toString();
        } catch {
          return false;
        }
        
        
        return sightingCity.toLowerCase() === selectedCity.toLowerCase() && 
               sightingYear === selectedYear;
      })
      .forEach(sighting => {
        try {
          const month = new Date(sighting.date).getMonth();
          monthlyData[month]++;
        } catch (error) {
          console.log('Invalid date format for chart:', sighting.date);
        }
      });

    console.log('Chart data for', selectedCity, selectedYear, ':', monthlyData);
    return monthlyData;
  }, [sightings, selectedCity, selectedYear]);

  const monthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];

  const maxSightings = Math.max(...chartData, 1); 
  const totalSightings = chartData.reduce((sum, count) => sum + count, 0);

  
  React.useEffect(() => {
    if (cities.length > 0 && !cities.includes(selectedCity)) {
      setSelectedCity(cities[0]);
    }
  }, [cities, selectedCity]);

  
  React.useEffect(() => {
    const yearStrings = years.map(year => year.toString());
    if (yearStrings.length > 0 && !yearStrings.includes(selectedYear)) {
      setSelectedYear(yearStrings[0]);
    }
  }, [years, selectedYear]);

  return (
    <div>
      <h2>Seasonal Tick Activity</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Track tick sighting patterns throughout the year to understand seasonal risks in different UK locations.
      </p>

     
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: '1fr 1fr', 
        gap: '1rem', 
        marginBottom: '2rem',
        padding: '1rem',
        backgroundColor: '#f8f9fa',
        borderRadius: '8px'
      }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Select City:
          </label>
          <select 
            value={selectedCity} 
            onChange={(e) => setSelectedCity(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            {cities.map(city => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            {cities.length} cities available
          </div>
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 'bold' }}>
            Select Year:
          </label>
          <select 
            value={selectedYear} 
            onChange={(e) => setSelectedYear(e.target.value)}
            style={{ width: '100%', padding: '0.5rem', border: '1px solid #ddd', borderRadius: '4px' }}
          >
            {years.map(year => (
              <option key={year} value={year.toString()}>
                {year}
              </option>
            ))}
          </select>
          <div style={{ fontSize: '0.8rem', color: '#666', marginTop: '0.5rem' }}>
            {years.length} years available (2012 - 2025)
          </div>
        </div>
      </div>

      #
      <div style={{ 
        padding: '0.5rem', 
        backgroundColor: '#fff3cd', 
        border: '1px solid #ffeaa7',
        borderRadius: '4px',
        marginBottom: '1rem',
        fontSize: '0.8rem'
      }}>
        <strong>Debug Info:</strong> {sightings.length} total sightings | {cities.length} cities | Selected: {selectedCity} - {selectedYear}
      </div>

      
      <div style={{ 
        marginBottom: '2rem',
        padding: '1.5rem',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: 'white'
      }}>
        <h3 style={{ 
          textAlign: 'center', 
          marginBottom: '1.5rem',
          color: '#2c5aa0'
        }}>
          Tick Sightings in {selectedCity} - {selectedYear}
        </h3>
        
        {totalSightings === 0 ? (
          <div style={{ 
            textAlign: 'center', 
            padding: '3rem',
            color: '#666'
          }}>
            <h4>No Data Available</h4>
            <p>No tick sightings found for <strong>{selectedCity}</strong> in <strong>{selectedYear}</strong>.</p>
            <p>This could be because:</p>
            <ul style={{ textAlign: 'left', maxWidth: '400px', margin: '1rem auto' }}>
              <li>No sightings have been reported in this location yet</li>
              <li>The selected year doesn't have data for this city</li>
              <li>There might be a mismatch in city names</li>
            </ul>
            <p>Try selecting a different city or year, or report some sightings to see data here!</p>
          </div>
        ) : (
          <>
            
            <div style={{ 
              display: 'grid', 
              gridTemplateColumns: '80px 1fr', 
              gap: '0.5rem', 
              alignItems: 'end',
              minHeight: '250px',
              marginBottom: '2rem'
            }}>
              {chartData.map((count, monthIndex) => {
                const barHeight = Math.max((count / maxSightings) * 100, 5); 
                return (
                  <React.Fragment key={monthIndex}>
                    <div style={{ 
                      textAlign: 'right', 
                      padding: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: 'bold',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end'
                    }}>
                      {monthNames[monthIndex]}
                    </div>
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'end', 
                      height: '200px',
                      position: 'relative'
                    }}>
                      <div
                        style={{
                          height: `${barHeight}%`,
                          backgroundColor: count > 0 ? 
                            (count > maxSightings * 0.7 ? '#dc3545' : 
                             count > maxSightings * 0.4 ? '#ff9900' : '#28a745') : '#e9ecef',
                          width: '40px',
                          borderRadius: '4px 4px 0 0',
                          position: 'relative',
                          transition: 'height 0.3s ease',
                          cursor: 'pointer',
                          margin: '0 auto'
                        }}
                        title={`${count} sightings in ${monthNames[monthIndex]}`}
                      >
                        {count > 0 && (
                          <div style={{
                            position: 'absolute',
                            top: '-25px',
                            left: '50%',
                            transform: 'translateX(-50%)',
                            backgroundColor: 'rgba(0,0,0,0.8)',
                            color: 'white',
                            padding: '2px 6px',
                            borderRadius: '3px',
                            fontSize: '0.8rem',
                            whiteSpace: 'nowrap',
                            zIndex: 10
                          }}>
                            {count} {count === 1 ? 'sighting' : 'sightings'}
                          </div>
                        )}
                      </div>
                    </div>
                  </React.Fragment>
                );
              })}
            </div>

           
            <div style={{
              textAlign: 'center',
              marginTop: '1rem',
              color: '#666',
              fontSize: '0.9rem',
              fontWeight: 'bold'
            }}>
              Months of the Year
            </div>
          </>
        )}
      </div>

      
      {totalSightings > 0 && (
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
          gap: '1rem',
          marginBottom: '2rem'
        }}>
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#e9f5ff', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#2c5aa0' }}>Total Sightings</h4>
            <p style={{ fontSize: '2rem', fontWeight: 'bold', margin: 0, color: '#2c5aa0' }}>
              {totalSightings}
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#fff0e6', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#ff9900' }}>Peak Month</h4>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#ff9900' }}>
              {monthNames[chartData.indexOf(Math.max(...chartData))]}
            </p>
          </div>
          
          <div style={{ 
            padding: '1rem', 
            backgroundColor: '#f0fff0', 
            borderRadius: '8px',
            textAlign: 'center'
          }}>
            <h4 style={{ margin: '0 0 0.5rem 0', color: '#28a745' }}>Average Monthly</h4>
            <p style={{ fontSize: '1.2rem', fontWeight: 'bold', margin: 0, color: '#28a745' }}>
              {(totalSightings / chartData.filter(count => count > 0).length || 0).toFixed(1)}
            </p>
          </div>
        </div>
      )}

      
      <div style={{ 
        padding: '1rem', 
        backgroundColor: '#f8f9fa', 
        borderRadius: '8px',
        borderLeft: '4px solid #2c5aa0'
      }}>
        <h4 style={{ color: '#2c5aa0', marginTop: 0 }}>Understanding Seasonal Patterns</h4>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
          <div>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              <span style={{ color: '#dc3545' }}>Spring (March-May):</span>
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Ticks become active as temperatures rise. Nymphs are most active during this period.
            </p>
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              <span style={{ color: '#ff9900' }}>Summer (June-August):</span>
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Adult ticks are active. Hot, dry weather may reduce activity in some areas.
            </p>
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              <span style={{ color: '#28a745' }}>Autumn (September-November):</span>
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Second peak of activity as temperatures cool and humidity increases.
            </p>
          </div>
          <div>
            <p style={{ marginBottom: '0.5rem', fontWeight: 'bold' }}>
              <span style={{ color: '#6c757d' }}>Winter (December-February):</span>
            </p>
            <p style={{ margin: 0, fontSize: '0.9rem' }}>
              Ticks are less active but can be found in mild winters, especially in sheltered areas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeasonalChart;