import React from 'react';

const SpeciesGuide = () => {
  const speciesData = [
    {
      name: 'Southern rodent tick',
      latinName: 'Ixodes acuminatus',
      description: 'Commonly found on small rodents like mice and voles. Prefers woodland and grassland habitats.',
      habitat: 'Woodlands, grasslands, hedgerows',
      risk: 'Medium - Can transmit various pathogens',
      season: 'Most active: Spring and Autumn'
    },
    {
      name: 'Marsh tick',
      latinName: 'Dermacentor reticulatus',
      description: 'Larger tick species often found in wetland areas. Known for its ornate patterned back.',
      habitat: 'Wetlands, marshes, damp grasslands',
      risk: 'High - Known to transmit babesiosis',
      season: 'Most active: Spring and late Summer'
    },
    {
      name: 'Sheep tick',
      latinName: 'Ixodes ricinus',
      description: 'The most common tick in the UK, found on various mammals including sheep, deer, and humans.',
      habitat: 'Woodlands, moorlands, grasslands with deer',
      risk: 'High - Primary vector for Lyme disease',
      season: 'Active year-round, peaks in Spring/Autumn'
    },
    {
      name: 'Hedgehog tick',
      latinName: 'Ixodes hexagonus',
      description: 'Commonly found on hedgehogs but will bite other mammals including pets and humans.',
      habitat: 'Urban gardens, parks, woodland edges',
      risk: 'Medium - Can transmit various tick-borne diseases',
      season: 'Most active: Summer months'
    }
  ];

  return (
    <div>
      <h2>Tick Species Identification Guide</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Learn to identify different tick species found in the UK and understand their habitats and risks.
      </p>
      
      {speciesData.map((species, index) => (
        <div key={index} style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ 
            color: '#2c5aa0', 
            marginBottom: '0.5rem',
            borderBottom: '2px solid #2c5aa0',
            paddingBottom: '0.5rem'
          }}>
            {species.name}
          </h3>
          <p style={{ 
            fontStyle: 'italic', 
            color: '#666', 
            marginBottom: '1rem',
            fontSize: '0.9rem'
          }}>
            {species.latinName}
          </p>
          <p style={{ marginBottom: '1rem' }}>
            <strong>Description:</strong> {species.description}
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div>
              <p style={{ margin: '0.5rem 0' }}>
                <strong>Habitat:</strong><br />
                {species.habitat}
              </p>
            </div>
            <div>
              <p style={{ margin: '0.5rem 0' }}>
                <strong>Risk Level:</strong><br />
                {species.risk}
              </p>
            </div>
          </div>
          <p style={{ 
            margin: '1rem 0 0 0', 
            padding: '0.5rem',
            backgroundColor: '#e9f5ff',
            borderRadius: '4px',
            fontSize: '0.9rem'
          }}>
            <strong>Seasonal Activity:</strong> {species.season}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SpeciesGuide;