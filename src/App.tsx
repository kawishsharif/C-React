import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';

// Icons
import { ReactComponent as SearchIcon } from './assets/search.svg';
import { ReactComponent as GearIcon } from './assets/gear.svg';

// Views
import OverviewView from './components/views/OverviewView';
import MapView from './components/views/MapView';
import EntityView from './components/views/EntityView';
import AlertInfoView from './components/views/AlertInfoView';

const App: React.FC = () => {
  // State to track the active navigation item for styling
  const [activeNav, setActiveNav] = useState('overview');
  
  return (
    <Router>
      <div className="material-background" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <div className="app-container">
          {/* Top bar */}
          <div style={{ height: '60px', display: 'flex', alignItems: 'center', padding: '0 80px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', width: '100%', alignItems: 'center' }}>
              {/* Navigation bar */}
              <ul className="navigation-bar">
                <li className={`navigation-item ${activeNav === 'overview' ? 'selected' : ''}`}>
                  <Link to="/" onClick={() => setActiveNav('overview')} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', padding: '5px 0' }}>
                    Alerts Overview
                  </Link>
                </li>
                <li className={`navigation-item ${activeNav === 'map' ? 'selected' : ''}`}>
                  <Link to="/map" onClick={() => setActiveNav('map')} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', padding: '5px 0' }}>
                    Map
                  </Link>
                </li>
                <li className={`navigation-item ${activeNav === 'entity' ? 'selected' : ''}`}>
                  <Link to="/entity" onClick={() => setActiveNav('entity')} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', padding: '5px 0' }}>
                    Entity
                  </Link>
                </li>
                <li className={`navigation-item ${activeNav === 'alert-info' ? 'selected' : ''}`}>
                  <Link to="/alert-info" onClick={() => setActiveNav('alert-info')} style={{ textDecoration: 'none', color: 'inherit', display: 'block', height: '100%', padding: '5px 0' }}>
                    Alert Info
                  </Link>
                </li>
              </ul>
              
              {/* Buttons */}
              <div style={{ display: 'flex' }}>
                <button className="icon-button" style={{ marginRight: '10px' }}>
                  <SearchIcon width="16" height="16" />
                </button>
                <button className="icon-button">
                  <GearIcon width="16" height="16" />
                </button>
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="material-divider" style={{ height: '1px', borderTop: '0.1px solid rgba(255, 255, 255, 0.12)', width: '100%' }}></div>
          
          {/* Content area */}
          <div className="content-container" style={{ overflowY: 'auto', flex: 1, padding: '0 80px 30px', marginTop: '30px' }}>
            <Routes>
              <Route path="/" element={<OverviewView />} />
              <Route path="/map" element={<MapView />} />
              <Route path="/entity" element={<EntityView />} />
              <Route path="/alert-info" element={<AlertInfoView />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
};

export default App;
