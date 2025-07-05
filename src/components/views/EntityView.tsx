import React, { useState } from 'react';
import { locationToString, Location } from '../../converters';

// Define interfaces for our data types
interface Entity {
  entityId: string;
  name: string;
  type: string;
  location: Location;
  lastSeen: Date;
  status: string;
  image: string | null;
}

interface RelatedIncident {
  incidentId: string;
  status: string;
  about: string;
  time: string;
  date: string;
}

// Mock data for entities
const mockEntities: Entity[] = [
  {
    entityId: 'ENT-001',
    name: 'Person',
    type: 'Human',
    location: { lat: 34.0522, lng: -118.2437, name: 'South Gate' },
    lastSeen: new Date('2025-07-04T19:30:00'),
    status: 'Active',
    image: null // Base64 image would go here
  },
  {
    entityId: 'ENT-002',
    name: 'Vehicle',
    type: 'Car',
    location: { lat: 34.0500, lng: -118.2400, name: 'East Entrance' },
    lastSeen: new Date('2025-07-04T18:45:00'),
    status: 'Inactive',
    image: null // Base64 image would go here
  },
  {
    entityId: 'ENT-003',
    name: 'Object',
    type: 'Package',
    location: { lat: 34.0550, lng: -118.2450, name: 'North Gate' },
    lastSeen: new Date('2025-07-04T17:20:00'),
    status: 'Unknown',
    image: null // Base64 image would go here
  }
];

// Mock data for related incidents
const mockRelatedIncidents: RelatedIncident[] = [
  {
    incidentId: 'INC-001',
    status: 'Active',
    about: 'Suspicious activity detected',
    time: '18:20',
    date: 'July 4, 2025'
  },
  {
    incidentId: 'INC-005',
    status: 'Confirmed',
    about: 'Unauthorized access',
    time: '14:15',
    date: 'July 4, 2025'
  }
];

const EntityView: React.FC = () => {
  const [entities, setEntities] = useState<Entity[]>(mockEntities);
  const [selectedEntity, setSelectedEntity] = useState<Entity | null>(null);
  const [relatedIncidents, setRelatedIncidents] = useState<RelatedIncident[]>([]);
  const [isEntityDetailsVisible, setIsEntityDetailsVisible] = useState<boolean>(false);
  const [filters, setFilters] = useState<string[]>(['Active', 'Today']);
  
  // Event handlers
  const handleRefreshEntities = () => {
    // In a real app, this would fetch data from a server
    console.log('Refreshing entities');
    // For now we just use the mock data
    setEntities([...mockEntities]);
  };

  const handleSelectEntity = (entity: Entity) => {
    setSelectedEntity(entity);
    setIsEntityDetailsVisible(true);
    // In a real app, this would fetch related incidents
    setRelatedIncidents([...mockRelatedIncidents]);
  };

  const handleClose = () => {
    setIsEntityDetailsVisible(false);
    setSelectedEntity(null);
    setRelatedIncidents([]);
  };

  const handleRemoveFilter = (filter: string) => {
    setFilters(filters.filter(f => f !== filter));
  };

  const handleViewIncident = (incident: RelatedIncident) => {
    // In a real app, this would navigate to the AlertInfoView with the selected incident
    console.log('View incident:', incident.incidentId);
  };

  const getStatusColor = (status: string | undefined): string => {
    switch(status && status.toLowerCase()) {
      case 'active': return '#4CAF50'; // Green
      case 'inactive': return '#9E9E9E'; // Gray
      default: return '#2196F3'; // Blue
    }
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <h2 className="headline6">Entities</h2>
        <button className="secondary-button" onClick={handleRefreshEntities}>
          <span style={{ display: 'flex', alignItems: 'center' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z"/>
            </svg>
            <span style={{ marginLeft: '5px' }}>Refresh</span>
          </span>
        </button>
      </div>

      {/* Entity Details */}
      {isEntityDetailsVisible && selectedEntity && (
        <div className="material-control-background" style={{ marginTop: '20px', borderRadius: '8px' }}>
          <div style={{ margin: '15px' }}>
            <div style={{ display: 'flex', gap: '15px' }}>
              <div className="material-background" style={{ flex: 1, borderRadius: '5px', padding: '20px' }}>
                <button 
                  className="icon-button" 
                  style={{ float: 'right' }}
                  onClick={handleClose}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"/>
                  </svg>
                </button>
                
                <h3 className="headline6">Entity Details</h3>
                
                <div style={{ marginTop: '15px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                  <div>
                    <strong>ID:</strong> {selectedEntity.entityId}
                  </div>
                  <div>
                    <strong>Name:</strong> {selectedEntity.name}
                  </div>
                  <div>
                    <strong>Type:</strong> {selectedEntity.type}
                  </div>
                  <div>
                    <strong>Location:</strong> {locationToString(selectedEntity.location)}
                  </div>
                  <div>
                    <strong>Last Seen:</strong> {selectedEntity.lastSeen.toLocaleString()}
                  </div>
                  <div>
                    <strong>Status:</strong> 
                    <span 
                      className="status-badge" 
                      style={{ 
                        backgroundColor: getStatusColor(selectedEntity.status), 
                        marginLeft: '8px',
                        padding: '3px 8px'
                      }}
                    >
                      {selectedEntity.status}
                    </span>
                  </div>
                </div>
                
                {selectedEntity.image ? (
                  <div style={{ marginTop: '20px', textAlign: 'center' }}>
                    <img 
                      src={`data:image/jpeg;base64,${selectedEntity.image}`} 
                      alt="Entity" 
                      style={{ maxWidth: '100%', maxHeight: '250px', borderRadius: '5px' }}
                    />
                  </div>
                ) : (
                  <div style={{ 
                    marginTop: '20px', 
                    height: '150px', 
                    backgroundColor: '#2A303C', 
                    borderRadius: '5px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center'
                  }}>
                    No Image Available
                  </div>
                )}
              </div>
              
              <div className="material-background" style={{ flex: 1, borderRadius: '5px', padding: '20px' }}>
                <h3 className="headline6">Related Incidents</h3>
                
                {relatedIncidents.length > 0 ? (
                  <div style={{ marginTop: '15px' }}>
                    {relatedIncidents.map((incident, index) => (
                      <div 
                        key={index} 
                        className="material-control-background"
                        style={{ 
                          padding: '10px',
                          borderRadius: '5px', 
                          marginBottom: '10px',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '10px'
                        }}
                        onClick={() => handleViewIncident(incident)}
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <div>
                            <span style={{ fontWeight: 'bold' }}>{incident.incidentId}</span>
                            <span 
                              className="status-badge" 
                              style={{ 
                                backgroundColor: incident.status === 'Active' ? '#FF9800' : 
                                  incident.status === 'Confirmed' ? '#4CAF50' : 
                                  '#F44336',
                                marginLeft: '8px',
                                fontSize: '0.8em'
                              }}
                            >
                              {incident.status}
                            </span>
                          </div>
                          <div style={{ fontSize: '0.9em', color: '#aaa' }}>
                            {incident.time} • {incident.date}
                          </div>
                        </div>
                        <div>{incident.about}</div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div style={{ 
                    marginTop: '20px', 
                    padding: '30px', 
                    textAlign: 'center', 
                    backgroundColor: '#2A303C',
                    borderRadius: '5px'
                  }}>
                    No related incidents found
                  </div>
                )}
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

      {/* Entity List */}
      <div>
        {entities.map(entity => (
          <div 
            key={entity.entityId} 
            className="material-background" 
            style={{
              margin: '10px 0',
              padding: '15px',
              borderRadius: '8px',
              cursor: 'pointer',
            }}
            onClick={() => handleSelectEntity(entity)}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <h4 style={{ margin: '0 0 5px 0' }}>{entity.name}</h4>
                <span 
                  className="status-badge" 
                  style={{ backgroundColor: getStatusColor(entity.status) }}
                >
                  {entity.status}
                </span>
                <span style={{ marginLeft: '10px', fontSize: '14px' }}>{entity.type}</span>
              </div>
              <div style={{ textAlign: 'right', fontSize: '14px' }}>
                <div>{locationToString(entity.location)}</div>
                <div style={{ color: '#aaa', fontSize: '12px' }}>
                  Last seen: {entity.lastSeen.toLocaleString('en-GB', {
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

        {/* Empty state */}
        {entities.length === 0 && (
          <div style={{ textAlign: 'center', padding: '50px', color: '#aaa' }}>
            No entities to display. Use the Refresh button to check for new entities.
          </div>
        )}
      </div>
    </div>
  );
};

export default EntityView;
