import React from 'react';
import { statusToColor, locationToString, base64ToImage } from '../../converters';

/**
 * IncidentCard component - displays incident details in a card format
 * Equivalent to the incident display in the C# WPF application
 */
const IncidentCard = ({ incident, onExpand }) => {
  if (!incident) return null;

  const formatDate = (date) => {
    if (!date) return '';
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  const formatTime = (date) => {
    if (!date) return '';
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="card" style={{ padding: '15px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
        <h3 style={{ margin: '0', fontSize: '18px' }}>{incident.incidentId}</h3>
        <span 
          className="status-badge" 
          style={{ backgroundColor: statusToColor(incident.status) }}
        >
          {incident.status}
        </span>
      </div>
      
      <div style={{ display: 'flex' }}>
        <div style={{ flex: '1' }}>
          {/* Left side - Incident details */}
          <div style={{ marginBottom: '8px' }}>
            <strong>Location:</strong> {locationToString(incident.location)}
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong>Time:</strong> {formatTime(incident.incidentTime)} {formatDate(incident.incidentTime)}
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong>Last Updated:</strong> {formatTime(incident.lastUpdateTime)} {formatDate(incident.lastUpdateTime)}
          </div>
          
          <div style={{ marginBottom: '8px' }}>
            <strong>Last Updated By:</strong> {incident.lastUpdatedBy || 'N/A'}
          </div>
          
          {incident.about && (
            <div style={{ marginTop: '15px' }}>
              <p>{incident.about}</p>
            </div>
          )}
        </div>
        
        <div style={{ flex: '0 0 150px', marginLeft: '15px' }}>
          {/* Right side - Image */}
          {incident.crop ? (
            <img 
              src={base64ToImage(incident.crop)} 
              alt="Incident" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '150px', 
                borderRadius: '5px',
                objectFit: 'contain' 
              }} 
            />
          ) : (
            <div style={{ 
              height: '150px', 
              backgroundColor: '#2A303C', 
              borderRadius: '5px', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center' 
            }}>
              <span style={{ opacity: 0.7 }}>No Image</span>
            </div>
          )}
        </div>
      </div>
      
      <div style={{ marginTop: '15px', textAlign: 'right' }}>
        <button 
          className="secondary-button" 
          onClick={() => onExpand && onExpand(incident)}
        >
          Expand
        </button>
      </div>
    </div>
  );
};

export default IncidentCard;
