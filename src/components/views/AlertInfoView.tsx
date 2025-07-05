import React, { useState } from 'react';
import { statusToColor, locationToString, base64ToImage } from '../../converters';
import type { Location } from '../../converters';
import placeholderImage from '../../assets/Images/placeholder.jpg';
import VideoPlayerView from './VideoPlayerView';

// Define interfaces for our data types
interface Incident {
  incidentId: string;
  status: string;
  location: Location;
  incidentTime: Date;
  crop: string | null;
}

interface IncidentUpdate {
  time: string;
  date: string;
  status: string;
  about: string;
}

interface EntityCard {
  entityId: string;
  seenTime: string;
}

// Mock data for incident details
const mockIncident: Incident = {
  incidentId: 'INC-001',
  status: 'Active',
  location: { lat: 34.0522, lng: -118.2437, name: 'South Gate' },
  incidentTime: new Date('2025-07-04T18:20:00'),
  crop: 'placeholder', // Using placeholder image
};

// Mock data for incident history
const mockIncidentHistory: IncidentUpdate[] = [
  {
    time: '18:20',
    date: 'July 4, 2025',
    status: 'Active',
    about: 'Incident detected'
  },
  {
    time: '18:25',
    date: 'July 4, 2025',
    status: 'Pending',
    about: 'Under investigation'
  },
  {
    time: '19:30',
    date: 'July 4, 2025',
    status: 'Active',
    about: 'Confirmed by operator'
  }
];

// Mock data for associated entities
const mockEntityIds: string[] = ['ENT-001', 'ENT-002', 'ENT-003'];

const AlertInfoView: React.FC = () => {
  const [selectedIncident] = useState<Incident>(mockIncident);
  const [incidentUpdateHistory] = useState<IncidentUpdate[]>(mockIncidentHistory);
  const [entityIds] = useState<string[]>(mockEntityIds);
  const [selectedEntity] = useState<string | null>(null);
  const [selectedEntityCard, setSelectedEntityCard] = useState<EntityCard | null>(null);
  const [isIncidentDetailsVisible] = useState<boolean>(true);

  // Event handlers
  const handleCollapse = () => {
    setSelectedEntityCard(null);
  };

  const handleShowInfo = (entityId: string) => {
    // In a real app, this would fetch the entity details
    console.log('Show info for entity:', entityId);
    setSelectedEntityCard({
      entityId: entityId,
      seenTime: new Date().toLocaleString()
    });
  };

  // VideoPlayer properties can be defined here when needed

  return (
    <div style={{ visibility: isIncidentDetailsVisible ? 'visible' : 'hidden' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="headline6">
          Incident {selectedIncident.incidentId}
        </h2>
        <button className="secondary-button">
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z"/>
            </svg>
            <span style={{ marginLeft: '5px' }}>Export</span>
          </span>
        </button>
      </div>

      {/* Incident Details and Video Player */}
      <div style={{ marginTop: '20px', borderRadius: '8px' }}>
        <div style={{ display: 'flex', gap: '15px' }}>
          <div className="material-background" style={{ 
            borderRadius: '8px', 
            padding: '20px',
            backgroundColor: '#171b26' // Exact MaterialDesignControlBackground color
          }}>
            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: '20px' }}>
                {selectedIncident.crop === 'placeholder' ? (
                  <img 
                    src={placeholderImage} 
                    alt="Incident" 
                    style={{ 
                      height: '200px', 
                      width: '150px', 
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }} 
                  />
                ) : selectedIncident.crop ? (
                  <img 
                    src={base64ToImage(selectedIncident.crop)} 
                    alt="Incident" 
                    style={{ 
                      height: '200px', 
                      width: '150px', 
                      borderRadius: '8px',
                      objectFit: 'cover'
                    }} 
                  />
                ) : (
                  <div style={{ 
                    height: '200px', 
                    width: '150px', 
                    backgroundColor: '#1A1F27', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center',
                    overflow: 'hidden'
                  }}>
                    <img 
                      src={placeholderImage} 
                      alt="Placeholder" 
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover'
                      }}
                    />
                  </div>
                )}
              </div>
              
              <div>
                <h3 className="headline6" style={{ margin: '0 0 5px 0' }}>Incident Details</h3>
                
                <div style={{ margin: '10px 0' }}>
                  <span 
                    style={{
                      display: 'inline-block',
                      padding: '4px 8px',
                      backgroundColor: statusToColor(selectedIncident.status),
                      borderRadius: '12px',
                      marginRight: '10px',
                      marginBottom: '5px',
                      fontSize: '12px',
                      fontWeight: 'bold',
                      color: '#ffffff',
                      border: `1px solid ${statusToColor(selectedIncident.status)}`
                    }}
                  >
                    {selectedIncident.status}
                  </span>
                </div>

                <div style={{ margin: '5px 0' }}>
                  <strong>Location:</strong> {locationToString(selectedIncident.location)}
                </div>

                <div style={{ margin: '5px 0' }}>
                  <strong>Time:</strong> {selectedIncident.incidentTime.toLocaleString()}
                </div>
              </div>
            </div>
          </div>

          {/* Video Player component - using our actual VideoPlayerView component */}
          <div className="material-background" style={{ 
            flex: 1, 
            borderRadius: '8px', 
            backgroundColor: '#171b26', // Exact MaterialDesignControlBackground color from WPF
            overflow: 'hidden' 
          }}>
            <VideoPlayerView />
          </div>
        </div>
      </div>

      {/* Incident Update History */}
      <table className="data-grid" style={{ maxHeight: '300px', marginTop: '20px', marginBottom: '10px' }}>
        <thead>
          <tr>
            <th>Time</th>
            <th>Date</th>
            <th>Status</th>
            <th>About</th>
          </tr>
        </thead>
        <tbody>
          {incidentUpdateHistory.map((update, index) => (
            <tr key={index}>
              <td>{update.time}</td>
              <td>{update.date}</td>
              <td>
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <span 
                    className="status-badge" 
                    style={{ backgroundColor: statusToColor(update.status), borderRadius: '14px', padding: '5px 10px' }}
                  >
                    {update.status}
                  </span>
                </div>
              </td>
              <td>{update.about}</td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Associated Entities */}
      <div className="material-control-background" style={{ marginTop: '20px', borderRadius: '8px' }}>
        <div style={{ margin: '15px', display: 'flex' }}>
          <div className="material-background" style={{ flex: 1, borderRadius: '5px', padding: '30px' }}>
            <h3 className="headline6">Associated Entities</h3>
            {entityIds.map((entityId) => (
              <div key={entityId} style={{ margin: '10px 0', display: 'flex', justifyContent: 'space-between' }}>
                <span>{entityId}</span>
                <button 
                  className="secondary-button"
                  onClick={() => handleShowInfo(entityId)}
                >
                  Info
                </button>
              </div>
            ))}
          </div>

          {selectedEntity === null && !selectedEntityCard && (
            <div className="material-background" style={{ flex: 1.5, borderRadius: '5px', margin: '0 0 0 15px', padding: '10px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
              <span>Map Place Holder</span>
            </div>
          )}

          {selectedEntityCard && (
            <div className="material-background" style={{ flex: 1.5, borderRadius: '8px', margin: '0 0 0 15px', paddingLeft: '30px', paddingBottom: '30px', position: 'relative' }}>
              <button className="icon-button" style={{ position: 'absolute', top: '0', right: '0' }} onClick={handleCollapse}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                </svg>
              </button>
              
              <h3 className="headline6">Entity Details</h3>
              <div style={{ marginTop: '15px' }}>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Entity ID:</strong> {selectedEntityCard.entityId}
                </div>
                <div style={{ marginBottom: '10px' }}>
                  <strong>Last Seen:</strong> {selectedEntityCard.seenTime}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AlertInfoView;
