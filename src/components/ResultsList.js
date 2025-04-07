import React from 'react';

function ResultsList({ results }) {
  if (!results.length) return <p>No results yet.</p>;

  const getBackgroundColor = (providerName) => {
    switch (providerName.toLowerCase()) {
      case 'royal mail':
        return '#f8d7da';
      case 'evri':
        return '#d0e7ff';
      case 'yodel':
        return '#d8f3dc';
      case 'dhl':
        return '#fff3cd';
      case 'dpd':
        return '#fddde6';
      default:
        return '#eeeeee';
    }
  };

  const getIcon = (providerName) => {
    const name = providerName.toLowerCase();
    if (name.includes('royal')) return '👑';
    if (name.includes('evri')) return '🚚';
    if (name.includes('dpd')) return '📦';
    if (name.includes('dhl')) return '✈️';
    if (name.includes('yodel')) return '🌿';
    return '🚀';
  };

  const courierLinks = {
    'royal mail': 'https://www.royalmail.com/',
    'evri': 'https://www.evri.com/',
    'yodel': 'https://www.yodel.co.uk/',
    'dhl': 'https://www.dhl.co.uk/',
    'dpd': 'https://www.dpd.co.uk/'
  };

  // Function to handle the click event on the "Visit Website" button
  const handleClick = (website) => {
    window.open(website, '_blank');
  };

  return (
    <div className="results-wrapper">
      {results.map((option, index) => {
        const website = courierLinks[option.provider_name.toLowerCase()];
        return (
          <div
            key={index}
            className="result-card"
            style={{
              backgroundColor: getBackgroundColor(option.provider_name),
              border: '1px solid #ccc',
              padding: '20px'
            }}
          >
            <h3 style={{ marginBottom: '12px', fontSize: '1.2rem' }}>
              <span style={{ fontSize: '1.4rem' }}>{getIcon(option.provider_name)}</span>{' '}
              <strong>{option.provider_name}</strong>
            </h3>

            <p><strong>Service:</strong> {option.service_name}</p>
            <p><strong>💷 Price:</strong>{' '}
              <span style={{ fontSize: '1.3rem', fontWeight: 'bold' }}>
                £{option.price_gbp}
              </span>
            </p>
            <p><strong>⏱️ Speed:</strong> {option.delivery_speed}</p>
            <p><strong>♻️ Eco Rating:</strong> {option.carbon_rating}</p>

            {website && (
              <button
                onClick={() => handleClick(website)} // Use onClick here
                className="visit-btn"
              >
                Visit Website
              </button>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default ResultsList;
