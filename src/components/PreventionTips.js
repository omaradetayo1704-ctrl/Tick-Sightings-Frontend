import React from 'react';

const PreventionTips = () => {
  const preventionTips = [
    {
      category: 'Clothing',
      tips: [
        'Wear light-colored clothing to make ticks easier to spot',
        'Choose long-sleeved shirts and long trousers',
        'Tuck trousers into socks to create a barrier',
        'Use clothing treated with permethrin insecticide'
      ]
    },
    {
      category: 'Outdoor Behavior',
      tips: [
        'Stick to clear paths and avoid walking through long grass',
        'Use insect repellent containing DEET on exposed skin',
        'Avoid sitting directly on the ground in grassy areas',
        'Be extra vigilant in spring and autumn when ticks are most active'
      ]
    },
    {
      category: 'After Being Outdoors',
      tips: [
        'Check yourself, children, and pets thoroughly for ticks',
        'Pay attention to armpits, groin, waist, hairline, and behind knees',
        'Shower within 2 hours of being outdoors',
        'Put clothes in a dryer on high heat for 10 minutes to kill ticks'
      ]
    },
    {
      category: 'Tick Removal',
      tips: [
        'Use fine-tipped tweezers or a tick removal tool',
        'Grasp the tick as close to the skin surface as possible',
        'Pull upward with steady, even pressure - don\'t twist or jerk',
        'Clean the bite area and your hands with rubbing alcohol or soap',
        'Never crush a tick with your fingers'
      ]
    },
    {
      category: 'Garden & Home',
      tips: [
        'Keep lawns mowed and borders tidy',
        'Create wood chip or gravel barriers between lawns and wooded areas',
        'Remove leaf litter and clear brush around homes',
        'Discourage deer and rodents that carry ticks'
      ]
    }
  ];

  const emergencySigns = [
    'Developing a rash (especially a bullseye pattern)',
    'Experiencing fever, chills, or fatigue',
    'Having muscle or joint pains',
    'Noticing facial paralysis or severe headaches'
  ];

  return (
    <div>
      <h2>Tick Bite Prevention & Safety</h2>
      <p style={{ marginBottom: '2rem', color: '#666' }}>
        Protect yourself, your family, and your pets from tick bites and tick-borne diseases.
      </p>

      {preventionTips.map((section, index) => (
        <div key={index} style={{ 
          marginBottom: '2rem', 
          padding: '1.5rem', 
          border: '1px solid #ddd', 
          borderRadius: '8px',
          backgroundColor: '#f9f9f9'
        }}>
          <h3 style={{ 
            color: '#2c5aa0', 
            marginBottom: '1rem',
            borderBottom: '2px solid #2c5aa0',
            paddingBottom: '0.5rem'
          }}>
            {section.category}
          </h3>
          <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
            {section.tips.map((tip, tipIndex) => (
              <li key={tipIndex} style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}>
                {tip}
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ 
        marginTop: '2rem', 
        padding: '1.5rem', 
        border: '2px solid #dc3545', 
        borderRadius: '8px',
        backgroundColor: '#fff5f5'
      }}>
        <h3 style={{ color: '#dc3545', marginBottom: '1rem' }}>
          ⚠️ When to Seek Medical Attention
        </h3>
        <p style={{ marginBottom: '1rem', fontWeight: 'bold' }}>
          Contact your doctor if you develop any of these symptoms after a tick bite:
        </p>
        <ul style={{ margin: 0, paddingLeft: '1.5rem' }}>
          {emergencySigns.map((sign, index) => (
            <li key={index} style={{ marginBottom: '0.5rem', lineHeight: '1.5' }}>
              {sign}
            </li>
          ))}
        </ul>
        <p style={{ marginTop: '1rem', fontSize: '0.9rem', fontStyle: 'italic' }}>
          Early treatment of tick-borne diseases is most effective.
        </p>
      </div>
    </div>
  );
};

export default PreventionTips;