import React, { useState } from 'react';
import { statusToColor, base64ToImage, locationToString } from '../../converters';
import placeholderImage from '../../assets/Images/placeholder.jpg';

// Define interface for Incident
interface Incident {
  incidentId: string;
  status: string;
  about: string;
  location: {
    lat?: number;
    lng?: number;
    name?: string;
  };
  incidentTime: Date;
  lastUpdateTime: Date;
  lastUpdatedBy: string;
  crop: string | null;
}

// Mock data - replace with actual data when integrating with backend
const mockIncidents: Incident[] = [
  {
    incidentId: 'INC-001',
    status: 'Active',
    about: 'Suspicious activity detected',
    location: { lat: 34.0522, lng: -118.2437 },
    incidentTime: new Date('2025-07-04T18:20:00'),
    lastUpdateTime: new Date('2025-07-04T19:30:00'),
    lastUpdatedBy: 'System',
    crop: null, // Base64 image would go here
  },
  {
    incidentId: 'INC-002',
    status: 'Confirmed',
    about: 'Unauthorized access',
    location: { lat: 34.0522, lng: -118.2437, name: 'South Gate' },
    incidentTime: new Date('2025-07-04T14:15:00'),
    lastUpdateTime: new Date('2025-07-04T14:30:00'),
    lastUpdatedBy: 'John Doe',
    crop: null, // Base64 image would go here
  },
  {
    incidentId: 'INC-003',
    status: 'False',
    about: 'System malfunction',
    location: { name: 'North Entrance' },
    incidentTime: new Date('2025-07-03T09:45:00'),
    lastUpdateTime: new Date('2025-07-03T10:15:00'),
    lastUpdatedBy: 'Jane Smith',
    crop: null, // Base64 image would go here
  },
];

const OverviewView: React.FC = () => {
  // State variables matching the C# bindings
  const [incidents, setIncidents] = useState<Incident[]>(mockIncidents);
  const [selectedIncidentCard, setSelectedIncidentCard] = useState<Incident | null>(null);
  const [isIncidentDetailsVisible, setIsIncidentDetailsVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>(['Active', 'Today']);

  // Event handlers matching the C# commands
  const handleRefreshIncidents = () => {
    // In a real app, this would fetch data from a server
    console.log('Refreshing incidents');
    // For now we just use the mock data
    setIncidents([...mockIncidents]);
  };

  const handleExpand = (incident: Incident) => {
    setSelectedIncidentCard(incident);
    setIsIncidentDetailsVisible(true);
  };

  const handleCollapse = () => {
    setIsIncidentDetailsVisible(false);
    setSelectedIncidentCard(null);
  };

  const updateStatus = (newStatus: string) => {
    if (selectedIncidentCard) {
      // Update incident status
      const updatedIncidents = incidents.map(inc => 
        inc.incidentId === selectedIncidentCard.incidentId 
          ? { ...inc, status: newStatus } 
          : inc
      );
      
      setIncidents(updatedIncidents);
      setSelectedIncidentCard({ ...selectedIncidentCard, status: newStatus });
    }
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const handleExamine = () => {
    // In a real app, this would navigate to the AlertInfoView with the selected incident
    console.log('Examining incident:', selectedIncidentCard && selectedIncidentCard.incidentId);
  };

  return (
    <div className="overview-view" style={{ padding: '20px', height: '100%', backgroundColor: '#0d111d' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 className="headline6" style={{ margin: 0 }}>Alerts</h2>
        <button className="secondary-button" onClick={handleRefreshIncidents}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            <span style={{ marginLeft: '5px' }}>Refresh</span>
          </span>
        </button>
      </div>

      {/* Incident Details (expanded view) */}
      {isIncidentDetailsVisible && selectedIncidentCard && (
        <div className="material-control-background" style={{ borderRadius: '8px', marginTop: '20px' }}>
          <div style={{ margin: '15px' }}>
            <div style={{ display: 'flex' }}>
              {/* Map placeholder with actual placeholder image - exact dimensions from WPF */}
              <div style={{ 
                backgroundColor: '#1A1F27', 
                width: '300px',
                height: '200px', 
                borderRadius: '8px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                marginBottom: '15px',
                marginRight: '15px',
                overflow: 'hidden'
              }}>
                <img 
                  src={selectedIncidentCard?.crop ? base64ToImage(selectedIncidentCard.crop) : placeholderImage} 
                  alt="Incident location" 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </div>

              {/* Incident details - right side */}
              <div className="material-background" style={{ 
                flex: '1.5', 
                borderRadius: '5px', 
                marginLeft: '15px', 
                paddingLeft: '30px', 
                paddingBottom: '30px', 
                position: 'relative',
                paddingTop: '10px'
              }}>
                {/* Close button */}
                <button 
                  className="icon-button" 
                  style={{ position: 'absolute', top: '5px', right: '5px' }} 
                  onClick={handleCollapse}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
                
                <div style={{ display: 'flex' }}>
                  {/* Left column - incident details */}
                  <div style={{ flex: '1' }}>
                    <h3 className="headline6" style={{ margin: '0 0 5px 0', fontSize: '1.25rem', fontWeight: 500 }}>
                      {selectedIncidentCard.incidentId}
                    </h3>

                    {/* Status Badge - exact dimensions from WPF */}
                    <div 
                      style={{
                        display: 'inline-block', 
                        padding: '4px 8px', 
                        backgroundColor: statusToColor(selectedIncidentCard.status), 
                        borderRadius: '12px', 
                        marginRight: '10px',
                        marginBottom: '10px',
                        fontSize: '12px',
                        fontWeight: 'bold',
                        color: '#ffffff',
                        border: `1px solid ${statusToColor(selectedIncidentCard.status)}`
                      }}
                    >
                      {selectedIncidentCard.status}
                    </div>

                    {/* Incident details list */}
                    <div style={{ margin: '5px 0' }}>
                      <strong>Location:</strong> {locationToString(selectedIncidentCard.location)}
                    </div>

                    <div style={{ margin: '5px 0' }}>
                      <strong>Time:</strong> {selectedIncidentCard.incidentTime.toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </div>

                    <div style={{ margin: '5px 0' }}>
                      <strong>Last Updated At:</strong> {selectedIncidentCard.lastUpdateTime.toLocaleString('en-GB', {
                        day: '2-digit',
                        month: '2-digit',
                        year: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        hour12: false
                      })}
                    </div>

                    <div style={{ margin: '5px 0' }}>
                      <strong>Last Updated By:</strong> {selectedIncidentCard.lastUpdatedBy}
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: 'flex', marginTop: '20px' }}>
                      {/* Status update dropdown - in real app would be a proper dropdown component */}
                      <div className="material-dropdown" style={{ position: 'relative', marginRight: '10px' }}>
                        <div style={{ 
                          backgroundColor: '#171b26', /* SecondaryButton background color from ButtonsStyle.xaml */
                          borderRadius: '6px', 
                          padding: '10px 15px', 
                          display: 'flex', 
                          alignItems: 'center',
                          cursor: 'pointer',
                          border: '1px solid #323641', /* SecondaryButton border color from ButtonsStyle.xaml */
                          height: '40px',
                          boxSizing: 'border-box'
                        }}>
                          <span style={{ marginRight: '5px', fontWeight: 500, fontSize: '13px' }}>Update</span>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M7 10l5 5 5-5z"/>
                          </svg>
                        </div>
                        {/* Simulating dropdown items */}
                        <div style={{ 
                          position: 'absolute', 
                          top: '100%', 
                          left: 0, 
                          display: 'none', /* would be toggled with state in real app */
                          backgroundColor: 'rgba(42, 48, 60, 1)', 
                          borderRadius: '6px', 
                          zIndex: 10,
                          marginTop: '2px',
                          width: '100%',
                          padding: '2px'
                        }}>
                          <button 
                            onClick={() => updateStatus('Active')}
                            style={{
                              width: '100%', 
                              textAlign: 'left', 
                              padding: '8px', 
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            Active
                          </button>
                          <button 
                            onClick={() => updateStatus('Confirmed')}
                            style={{
                              width: '100%', 
                              textAlign: 'left', 
                              padding: '8px', 
                              border: 'none',
                              backgroundColor: 'transparent',
                              color: 'white',
                              cursor: 'pointer'
                            }}
                          >
                            Resolved
                          </button>
                        </div>
                      </div>

                      <button 
                        className="secondary-button" 
                        style={{ 
                          backgroundColor: '#171b26', /* SecondaryButton background color */
                          borderColor: '#323641', /* SecondaryButton border color */
                          borderWidth: '1px',
                          borderStyle: 'solid',
                          borderRadius: '6px',
                          height: '40px',
                          padding: '0 15px',
                          fontWeight: 500,
                          fontSize: '13px',
                          color: '#ffffff',
                          cursor: 'pointer'
                        }}
                        onClick={handleExamine}
                      >
                        Examine
                      </button>
                    </div>
                  </div>

                  <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start' }}>
                    {selectedIncidentCard.crop ? (
                      <img 
                        src={base64ToImage(selectedIncidentCard.crop)} 
                        alt={`Incident ${selectedIncidentCard.incidentId}`}
                        style={{ maxWidth: '100%', maxHeight: '300px', objectFit: 'contain' }}
                      />
                    ) : (
                      <div style={{ padding: '50px', backgroundColor: 'rgba(30, 34, 42, 1)', borderRadius: '4px', color: '#aaa' }}>
                        No image available
                      </div>
                    )}
                  </div>
                </div>

                <div style={{ marginTop: '20px' }}>
                  <h4>About</h4>
                  <p>{selectedIncidentCard.about || 'No description available.'}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters Section */}
      <div style={{ display: 'flex', margin: '20px 0 10px' }}>
        <span style={{ marginRight: '10px', alignSelf: 'center' }}>Filters:</span>
        {filters.map(filter => (
          <div 
            key={filter}
            style={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: 'rgba(42, 48, 60, 1)',
              borderRadius: '16px',
              padding: '4px 12px',
              marginRight: '8px',
            }}
          >
            <span>{filter}</span>
            <button
              style={{
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'white',
                marginLeft: '4px',
              }}
              onClick={() => handleRemoveFilter(filter)}
            >
              ×
            </button>
          </div>
        ))}
      </div>

      {/* Incident Cards */}
      <div>
        {incidents.map(incident => (
          <div 
            key={incident.incidentId} 
            className="material-background" 
            style={{
              margin: '10px 0',
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => handleExpand(incident)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{incident.incidentId}</h4>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: statusToColor(incident.status) }}
                >
                  {incident.status}
                </span>
                <p style={{ margin: '8px 0 0 0', fontSize: '14px' }}>{incident.about}</p>
              </div>
              <div style={{ textAlign: 'right', fontSize: '14px' }}>
                <div>{locationToString(incident.location)}</div>
                <div style={{ color: '#aaa', fontSize: '12px' }}>
                  {incident.incidentTime.toLocaleString('en-GB', {
                    day: '2-digit',
                    month: '2-digit',
                    year: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Empty state when no incidents */}
        {incidents.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#aaa' }}>
            No incidents to display. Use the Refresh button to check for new incidents.
          </div>
        )}
      </div>
    </div>
  );
};

export default OverviewView;
