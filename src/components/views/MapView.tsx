import React, { useState } from 'react';

// MapView component - matches MapView.xaml in the C# application
const MapView: React.FC = () => {
  const [isLoading] = useState<boolean>(false);
  
  return (
    <div style={{ padding: '20px', height: '100%', backgroundColor: '#0d111d' }}>
      <div className="view-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 className="headline6" style={{ margin: 0, fontSize: '20px', fontWeight: 500 }}>Map</h2>
      </div>
      
      <div className="material-background" style={{ marginTop: '20px', backgroundColor: '#171b26', borderRadius: '8px' }}>
        {/* Map container */}
        <div 
          style={{ 
            height: '600px', 
            width: '100%', 
            backgroundColor: '#1a1f27',
            borderRadius: '8px', 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center',
            position: 'relative'
          }}
        >
          {/* Map placeholder - exact match to C# WPF version */}
          <div style={{ 
            textAlign: 'center',
            color: '#ffffff',
            fontSize: '16px',
            fontFamily: 'Segoe UI, sans-serif',
            opacity: 0.7
          }}>
            Map Place Holder, Map Markers and popups must be drawn inside the map
          </div>
          
          {/* Loading indicator */}
          {isLoading && (
            <div 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                right: 0, 
                bottom: 0, 
                backgroundColor: 'rgba(0, 0, 0, 0.5)', 
                display: 'flex', 
                justifyContent: 'center', 
                alignItems: 'center',
                borderRadius: '8px'
              }}
            >
              <div className="loading-spinner">Loading...</div>
            </div>
          )}
        </div>
        
        {/* Controls panel */}
        <div style={{ marginTop: '15px', padding: '10px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div>
              <button className="secondary-button" style={{ marginRight: '10px' }}>
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm8.94 3c-.46-4.17-3.77-7.48-7.94-7.94V1h-2v2.06C6.83 3.52 3.52 6.83 3.06 11H1v2h2.06c.46 4.17 3.77 7.48 7.94 7.94V23h2v-2.06c4.17-.46 7.48-3.77 7.94-7.94H23v-2h-2.06zM12 19c-3.87 0-7-3.13-7-7s3.13-7 7-7 7 3.13 7 7-3.13 7-7 7z"/>
                  </svg>
                  <span style={{ marginLeft: '5px' }}>Center</span>
                </span>
              </button>
              <button className="secondary-button">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                  </svg>
                  <span style={{ marginLeft: '5px' }}>Show Incidents</span>
                </span>
              </button>
            </div>
            
            <div>
              <select className="text-field" style={{ height: '36px', marginRight: '10px' }}>
                <option value="">Map Style: Default</option>
                <option value="satellite">Map Style: Satellite</option>
                <option value="terrain">Map Style: Terrain</option>
                <option value="dark">Map Style: Dark</option>
              </select>
              
              <button className="secondary-button">
                <span style={{ display: 'flex', alignItems: 'center' }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
                  </svg>
                  <span style={{ marginLeft: '5px' }}>Refresh</span>
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Legend */}
      <div className="material-control-background" style={{ marginTop: '20px', borderRadius: '8px', padding: '15px', backgroundColor: '#0d111d' }}>
        <h3 className="headline6" style={{ marginTop: 0, marginBottom: '15px', fontSize: '16px', fontWeight: 500 }}>Map Legend</h3>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '15px' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#FF9800', 
              borderRadius: '50%',
              marginRight: '8px'
            }}></span>
            <span>Active Incident</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#4CAF50', 
              borderRadius: '50%',
              marginRight: '8px'
            }}></span>
            <span>Confirmed Incident</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <span style={{ 
              display: 'inline-block', 
              width: '20px', 
              height: '20px', 
              backgroundColor: '#2196F3', 
              borderRadius: '50%',
              marginRight: '8px'
            }}></span>
            <span>Entity</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapView;
