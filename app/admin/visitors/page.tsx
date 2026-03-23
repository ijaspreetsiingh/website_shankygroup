'use client';

import { useEffect, useState, useRef } from 'react';
import { MapPin, Users, Eye, Filter, Search, RefreshCw, Globe, Activity } from 'lucide-react';
import dynamic from 'next/dynamic';
import 'leaflet/dist/leaflet.css';

const MapComponent = dynamic(() => import('./_components/MapComponent'), { 
  ssr: false,
  loading: () => <div className="visitors-map-loading">Loading map...</div>
});

type Visitor = {
  id: number;
  ip: string | null;
  country: string | null;
  city: string | null;
  region: string | null;
  latitude: number | null;
  longitude: number | null;
  timezone: string | null;
  user_agent: string | null;
  browser: string | null;
  os: string | null;
  screen_resolution: string | null;
  language: string | null;
  referrer: string | null;
  visit_time: string | null;
};

type GroupedData = {
  [country: string]: {
    [state: string]: {
      [city: string]: Visitor[];
    };
  };
};

export default function AdminVisitorsPage() {
  const [visitors, setVisitors] = useState<Visitor[]>([]);
  const [groupedData, setGroupedData] = useState<GroupedData>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedCountries, setExpandedCountries] = useState<Set<string>>(new Set());
  const [expandedStates, setExpandedStates] = useState<Set<string>>(new Set());
  const [viewMode, setViewMode] = useState<'map' | 'list'>('map');
  const [selectedVisitor, setSelectedVisitor] = useState<Visitor | null>(null);

  const loadVisitors = async () => {
    try {
      setLoading(true);
      setError('');
      const res = await fetch('/admin/api/visitors', { cache: 'no-store' });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to load visitors');
      
      const visitorsData = data.rows || [];
      setVisitors(visitorsData);
      
      // Group visitors by location
      const grouped: GroupedData = {};
      visitorsData.forEach((visitor: Visitor) => {
        const country = visitor.country || 'Unknown';
        const state = visitor.region || 'Unknown';
        const city = visitor.city || 'Unknown';
        
        if (!grouped[country]) grouped[country] = {};
        if (!grouped[country][state]) grouped[country][state] = {};
        if (!grouped[country][state][city]) grouped[country][state][city] = [];
        
        grouped[country][state][city].push(visitor);
      });
      
      setGroupedData(grouped);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load visitors');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadVisitors();
  }, []);

  // Filter data based on search
  const getFilteredData = () => {
    let filtered = { ...groupedData };
    
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      filtered = Object.keys(filtered).reduce((acc, country) => {
        const countryMatch = country.toLowerCase().includes(term);
        const filteredStates = Object.keys(filtered[country]).reduce((stateAcc, state) => {
          const stateMatch = state.toLowerCase().includes(term);
          const filteredCities = Object.keys(filtered[country][state]).reduce((cityAcc, city) => {
            const cityMatch = city.toLowerCase().includes(term);
            const visitorsMatch = filtered[country][state][city].some(v => 
              (v.ip && v.ip.includes(term))
            );
            
            if (cityMatch || visitorsMatch) {
              cityAcc[city] = filtered[country][state][city];
            }
            return cityAcc;
          }, {} as typeof filtered[typeof country][typeof state]);
          
          if (stateMatch || Object.keys(filteredCities).length > 0) {
            stateAcc[state] = filteredCities;
          }
          return stateAcc;
        }, {} as typeof filtered[typeof country]);
        
        if (countryMatch || Object.keys(filteredStates).length > 0) {
          acc[country] = filteredStates;
        }
        return acc;
      }, {} as GroupedData);
    }
    
    return filtered;
  };

  const toggleCountry = (country: string) => {
    const newExpanded = new Set(expandedCountries);
    if (newExpanded.has(country)) {
      newExpanded.delete(country);
    } else {
      newExpanded.add(country);
    }
    setExpandedCountries(newExpanded);
  };

  const toggleState = (state: string) => {
    const newExpanded = new Set(expandedStates);
    if (newExpanded.has(state)) {
      newExpanded.delete(state);
    } else {
      newExpanded.add(state);
    }
    setExpandedStates(newExpanded);
  };

  const filteredData = getFilteredData();
  const totalVisitors = visitors.length;
  const totalCountries = Object.keys(groupedData).length;
  const totalStates = Object.values(groupedData).reduce((acc, country) => acc + Object.keys(country).length, 0);
  const totalCities = Object.values(groupedData).reduce((acc, country) => 
    acc + Object.values(country).reduce((stateAcc, state) => stateAcc + Object.keys(state).length, 0), 0
  );
  const visitorsWithCoords = visitors.filter(v => v.latitude && v.longitude);

  const css = `
    @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap');
    
    .visitors-root { font-family: 'DM Sans', sans-serif; color: #e2e8f0; min-height: 100vh; background: #080810; padding: 20px; }
    
    .visitors-header { display: flex; flex-wrap: wrap; align-items: flex-end; justify-content: space-between; gap: 16px; margin-bottom: 28px; }
    .visitors-eyebrow { font-size: 11px; font-weight: 600; letter-spacing: 1.8px; text-transform: uppercase; color: rgba(255,255,255,0.25); margin-bottom: 6px; }
    .visitors-title { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 26px; color: #fff; letter-spacing: -0.7px; margin-bottom: 4px; }
    .visitors-sub { font-size: 14px; color: rgba(255,255,255,0.36); font-weight: 300; }
    .visitors-controls { display: flex; align-items: center; gap: 10px; flex-wrap: wrap; }
    
    .visitors-search-wrap { position: relative; }
    .visitors-search-icon { position: absolute; top: 50%; left: 12px; transform: translateY(-50%); color: rgba(255,255,255,0.25); pointer-events: none; }
    .visitors-search {
      width: 240px; height: 38px; padding: 0 14px 0 36px;
      background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09);
      border-radius: 9px; color: #fff; font-size: 13px; font-family: 'DM Sans', sans-serif; outline: none;
      transition: border-color 0.18s, box-shadow 0.18s;
    }
    .visitors-search::placeholder { color: rgba(255,255,255,0.2); }
    .visitors-search:focus { border-color: rgba(99,57,255,0.45); box-shadow: 0 0 0 3px rgba(99,57,255,0.08); }
    
    .visitors-btn { display: inline-flex; align-items: center; gap: 7px; height: 38px; padding: 0 14px; border-radius: 9px; font-family: 'DM Sans', sans-serif; font-size: 13px; font-weight: 600; cursor: pointer; transition: all 0.18s; border: none; }
    .visitors-btn:disabled { opacity: 0.5; cursor: not-allowed; }
    .visitors-btn-ghost { background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.09); color: rgba(255,255,255,0.5); }
    .visitors-btn-ghost:hover:not(:disabled) { background: rgba(255,255,255,0.08); color: rgba(255,255,255,0.8); }
    .visitors-btn-primary { background: #6339ff; color: white; border: 1px solid #6339ff; }
    .visitors-btn-primary:hover:not(:disabled) { background: #5529e6; }
    .visitors-btn.active { background: #6339ff; color: white; border-color: #6339ff; }
    
    .visitors-stats { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 13px; margin-bottom: 24px; }
    .visitors-stat-card { background: #0d0d1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 13px; padding: 18px; }
    .visitors-stat-top { display: flex; align-items: center; justify-content: space-between; margin-bottom: 12px; }
    .visitors-stat-icon { width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.07); }
    .visitors-stat-value { font-family: 'Syne', sans-serif; font-weight: 800; font-size: 28px; color: #fff; letter-spacing: -1px; }
    .visitors-stat-label { font-size: 12px; color: rgba(255,255,255,0.32); font-weight: 400; }
    
    .visitors-map-container { background: #0d0d1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 13px; overflow: hidden; margin-bottom: 24px; height: 500px; position: relative; }
    .visitors-map-loading { display: flex; align-items: center; justify-content: center; height: 100%; color: rgba(255,255,255,0.5); }
    
    .visitors-location-card { background: #0d0d1a; border: 1px solid rgba(255,255,255,0.07); border-radius: 13px; overflow: hidden; margin-bottom: 13px; }
    .visitors-location-header { padding: 16px 18px; border-bottom: 1px solid rgba(255,255,255,0.06); display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: background-color 0.18s; }
    .visitors-location-header:hover { background: rgba(255,255,255,0.02); }
    .visitors-location-title { display: flex; align-items: center; gap: 10px; }
    .visitors-location-name { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 15px; color: #fff; }
    .visitors-location-count { font-size: 12px; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 100px; padding: 4px 8px; }
    .visitors-location-expand { color: rgba(255,255,255,0.3); transition: transform 0.18s; }
    .visitors-location-expand.expanded { transform: rotate(180deg); }
    
    .visitors-state-card { background: rgba(255,255,255,0.02); border: 1px solid rgba(255,255,255,0.05); border-radius: 11px; margin: 12px; overflow: hidden; }
    .visitors-state-header { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.04); display: flex; align-items: center; justify-content: space-between; cursor: pointer; transition: background-color 0.18s; }
    .visitors-state-header:hover { background: rgba(255,255,255,0.03); }
    .visitors-state-name { font-weight: 600; font-size: 14px; color: #fff; }
    .visitors-state-count { font-size: 11px; color: rgba(255,255,255,0.4); background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06); border-radius: 100px; padding: 3px 7px; }
    
    .visitors-city-list { padding: 12px; }
    .visitors-city-item { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.06); border-radius: 9px; padding: 12px 14px; margin-bottom: 10px; }
    .visitors-city-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 8px; }
    .visitors-city-name { font-weight: 600; font-size: 13px; color: #fff; display: flex; align-items: center; gap: 6px; }
    .visitors-city-count { font-size: 11px; color: rgba(255,255,255,0.4); }
    
    .visitors-table { width: 100%; font-size: 11px; }
    .visitors-table th { text-align: left; padding: 6px 8px; color: rgba(255,255,255,0.28); font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 1px solid rgba(255,255,255,0.08); }
    .visitors-table td { padding: 6px 8px; color: rgba(255,255,255,0.55); border-bottom: 1px solid rgba(255,255,255,0.04); }
    .visitors-table td:last-child { text-align: right; }
    
    .visitors-empty { text-align: center; padding: 40px; color: rgba(255,255,255,0.3); }
    .visitors-empty-icon { font-size: 48px; margin-bottom: 12px; opacity: 0.3; }
    .visitors-empty-title { font-weight: 600; margin-bottom: 4px; }
    .visitors-empty-sub { font-size: 12px; }
    
    .visitors-loading { display: flex; align-items: center; justify-content: center; min-height: 200px; }
    .visitors-spinner { width: 32px; height: 32px; border: 2px solid rgba(99,57,255,0.2); border-top-color: #6339ff; border-radius: 50%; animation: spin 0.8s linear infinite; }
    @keyframes spin { to { transform: rotate(360deg); } }
    
    .visitors-modal { position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.8); display: flex; align-items: center; justify-content: center; z-index: 1000; }
    .visitors-modal-content { background: #0d0d1a; border: 1px solid rgba(255,255,255,0.1); border-radius: 13px; padding: 24px; max-width: 500px; width: 90%; max-height: 80vh; overflow-y: auto; }
    .visitors-modal-header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 20px; }
    .visitors-modal-title { font-family: 'Syne', sans-serif; font-weight: 700; font-size: 18px; color: #fff; }
    .visitors-modal-close { background: none; border: none; color: rgba(255,255,255,0.5); cursor: pointer; padding: 4px; }
    .visitors-modal-close:hover { color: #fff; }
    .visitors-modal-info { display: grid; gap: 12px; }
    .visitors-modal-row { display: flex; justify-content: space-between; padding: 8px 0; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .visitors-modal-label { font-size: 12px; color: rgba(255,255,255,0.4); text-transform: uppercase; letter-spacing: 0.5px; }
    .visitors-modal-value { font-size: 13px; color: #fff; text-align: right; }
  `;

  if (loading) {
    return (
      <>
        <style>{css}</style>
        <div className="visitors-root">
          <div className="visitors-loading">
            <div className="visitors-spinner" />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <style>{css}</style>
      <div className="visitors-root">
        {/* Header */}
        <div className="visitors-header">
          <div>
            <p className="visitors-eyebrow">Analytics</p>
            <h1 className="visitors-title">Global Visitor Map</h1>
            <p className="visitors-sub">Real-time geographic distribution and visitor insights</p>
          </div>
          <div className="visitors-controls">
            <div className="visitors-search-wrap">
              <Search size={14} className="visitors-search-icon" />
              <input
                type="text"
                className="visitors-search"
                placeholder="Search visitors..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button 
              className={`visitors-btn visitors-btn-ghost ${viewMode === 'map' ? 'active' : ''}`}
              onClick={() => setViewMode('map')}
            >
              <Globe size={14} />
              Map View
            </button>
            <button 
              className={`visitors-btn visitors-btn-ghost ${viewMode === 'list' ? 'active' : ''}`}
              onClick={() => setViewMode('list')}
            >
              <Filter size={14} />
              List View
            </button>
            <button className="visitors-btn visitors-btn-ghost" onClick={loadVisitors} disabled={loading}>
              <RefreshCw size={14} className={loading ? 'visitors-spin' : ''} />
              Refresh
            </button>
          </div>
        </div>

        {/* Stats Cards */}
        <div className="visitors-stats">
          <div className="visitors-stat-card">
            <div className="visitors-stat-top">
              <div className="visitors-stat-icon" style={{ color: '#6339ff' }}>
                <Users size={16} />
              </div>
            </div>
            <div className="visitors-stat-value">{totalVisitors.toLocaleString()}</div>
            <div className="visitors-stat-label">Total Visitors</div>
          </div>
          <div className="visitors-stat-card">
            <div className="visitors-stat-top">
              <div className="visitors-stat-icon" style={{ color: '#14b8a6' }}>
                <Globe size={16} />
              </div>
            </div>
            <div className="visitors-stat-value">{totalCountries}</div>
            <div className="visitors-stat-label">Countries</div>
          </div>
          <div className="visitors-stat-card">
            <div className="visitors-stat-top">
              <div className="visitors-stat-icon" style={{ color: '#f59e0b' }}>
                <MapPin size={16} />
              </div>
            </div>
            <div className="visitors-stat-value">{totalStates}</div>
            <div className="visitors-stat-label">States/Regions</div>
          </div>
          <div className="visitors-stat-card">
            <div className="visitors-stat-top">
              <div className="visitors-stat-icon" style={{ color: '#8b5cf6' }}>
                <Activity size={16} />
              </div>
            </div>
            <div className="visitors-stat-value">{visitorsWithCoords.length}</div>
            <div className="visitors-stat-label">Mapped Locations</div>
          </div>
        </div>

        {/* Map View */}
        {viewMode === 'map' && (
          <div className="visitors-map-container">
            <MapComponent 
              visitors={visitorsWithCoords}
              onMarkerClick={setSelectedVisitor}
            />
          </div>
        )}

        {/* List View */}
        {viewMode === 'list' && (
          <>
            {Object.keys(filteredData).length === 0 ? (
              <div className="visitors-location-card">
                <div className="visitors-empty">
                  <div className="visitors-empty-icon">🌍</div>
                  <div className="visitors-empty-title">No visitor data found</div>
                  <div className="visitors-empty-sub">No visitors match your search criteria</div>
                </div>
              </div>
            ) : (
              Object.entries(filteredData).map(([country, states]) => {
                const countryVisitors = Object.values(states).reduce((acc, cities) => 
                  acc + Object.values(cities).reduce((cityAcc, visitors) => cityAcc + visitors.length, 0), 0
                );
                const isCountryExpanded = expandedCountries.has(country);
                
                return (
                  <div key={country} className="visitors-location-card">
                    <div 
                      className="visitors-location-header"
                      onClick={() => toggleCountry(country)}
                    >
                      <div className="visitors-location-title">
                        <Globe size={16} style={{ color: '#6339ff' }} />
                        <span className="visitors-location-name">{country}</span>
                        <span className="visitors-location-count">{countryVisitors} visitors</span>
                      </div>
                      <div className={`visitors-location-expand ${isCountryExpanded ? 'expanded' : ''}`}>
                        <Filter size={14} />
                      </div>
                    </div>
                    
                    {isCountryExpanded && (
                      <div>
                        {Object.entries(states).map(([state, cities]) => {
                          const stateVisitors = Object.values(cities).reduce((acc, visitors) => acc + visitors.length, 0);
                          const isStateExpanded = expandedStates.has(state);
                          
                          return (
                            <div key={state} className="visitors-state-card">
                              <div 
                                className="visitors-state-header"
                                onClick={() => toggleState(state)}
                              >
                                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                                  <MapPin size={14} style={{ color: '#14b8a6' }} />
                                  <span className="visitors-state-name">{state}</span>
                                  <span className="visitors-state-count">{stateVisitors} visitors</span>
                                </div>
                                <div className={`visitors-location-expand ${isStateExpanded ? 'expanded' : ''}`}>
                                  <Filter size={12} />
                                </div>
                              </div>
                              
                              {isStateExpanded && (
                                <div className="visitors-city-list">
                                  {Object.entries(cities).map(([city, cityVisitors]) => (
                                    <div key={city} className="visitors-city-item">
                                      <div className="visitors-city-header">
                                        <div className="visitors-city-name">
                                          <MapPin size={12} style={{ color: '#f59e0b' }} />
                                          {city}
                                          <span className="visitors-city-count">({cityVisitors.length} visitors)</span>
                                        </div>
                                      </div>
                                      
                                      {cityVisitors.length > 0 && (
                                        <table className="visitors-table">
                                          <thead>
                                            <tr>
                                              <th>IP Address</th>
                                              <th>Browser</th>
                                              <th>OS</th>
                                              <th>Time</th>
                                            </tr>
                                          </thead>
                                          <tbody>
                                            {cityVisitors.slice(0, 5).map((visitor) => (
                                              <tr key={visitor.id}>
                                                <td>{visitor.ip || 'Unknown'}</td>
                                                <td>{visitor.browser || 'Unknown'}</td>
                                                <td>{visitor.os || 'Unknown'}</td>
                                                <td>{visitor.visit_time ? new Date(visitor.visit_time).toLocaleString() : 'Unknown'}</td>
                                              </tr>
                                            ))}
                                            {cityVisitors.length > 5 && (
                                              <tr>
                                                <td colSpan={4} style={{ textAlign: 'center', fontStyle: 'italic' }}>
                                                  ... and {cityVisitors.length - 5} more
                                                </td>
                                              </tr>
                                            )}
                                          </tbody>
                                        </table>
                                      )}
                                    </div>
                                  ))}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </>
        )}

        {/* Visitor Detail Modal */}
        {selectedVisitor && (
          <div className="visitors-modal" onClick={() => setSelectedVisitor(null)}>
            <div className="visitors-modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="visitors-modal-header">
                <h3 className="visitors-modal-title">Visitor Details</h3>
                <button className="visitors-modal-close" onClick={() => setSelectedVisitor(null)}>
                  ✕
                </button>
              </div>
              <div className="visitors-modal-info">
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">IP Address</span>
                  <span className="visitors-modal-value">{selectedVisitor.ip || 'Unknown'}</span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Location</span>
                  <span className="visitors-modal-value">
                    {[selectedVisitor.city, selectedVisitor.region, selectedVisitor.country].filter(Boolean).join(', ') || 'Unknown'}
                  </span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Coordinates</span>
                  <span className="visitors-modal-value">
                    {selectedVisitor.latitude && selectedVisitor.longitude 
                      ? `${Number(selectedVisitor.latitude).toFixed(4)}, ${Number(selectedVisitor.longitude).toFixed(4)}`
                      : 'Unknown'
                    }
                  </span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Browser</span>
                  <span className="visitors-modal-value">{selectedVisitor.browser || 'Unknown'}</span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Operating System</span>
                  <span className="visitors-modal-value">{selectedVisitor.os || 'Unknown'}</span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Screen Resolution</span>
                  <span className="visitors-modal-value">{selectedVisitor.screen_resolution || 'Unknown'}</span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Language</span>
                  <span className="visitors-modal-value">{selectedVisitor.language || 'Unknown'}</span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Timezone</span>
                  <span className="visitors-modal-value">{selectedVisitor.timezone || 'Unknown'}</span>
                </div>
                <div className="visitors-modal-row">
                  <span className="visitors-modal-label">Visit Time</span>
                  <span className="visitors-modal-value">
                    {selectedVisitor.visit_time ? new Date(selectedVisitor.visit_time).toLocaleString() : 'Unknown'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
