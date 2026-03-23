'use client';

import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';

interface Visitor {
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
}

interface MapComponentProps {
  visitors: Visitor[];
  onMarkerClick: (visitor: Visitor) => void;
}

const MapComponent = ({ visitors, onMarkerClick }: MapComponentProps) => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersRef = useRef<L.Marker[]>([]);

  useEffect(() => {
    if (!mapRef.current || mapInstanceRef.current) return;

    // Initialize the map
    mapInstanceRef.current = L.map(mapRef.current).setView([20, 0], 2);

    // Add dark tile layer
    L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: 'abcd',
      maxZoom: 19
    }).addTo(mapInstanceRef.current);

    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (!mapInstanceRef.current) return;

    // Clear existing markers
    markersRef.current.forEach(marker => marker.remove());
    markersRef.current = [];

    // Group visitors by location to avoid overlapping markers
    const locationGroups = new Map<string, Visitor[]>();
    
    visitors.forEach(visitor => {
      if (visitor.latitude && visitor.longitude) {
        const key = `${visitor.latitude},${visitor.longitude}`;
        if (!locationGroups.has(key)) {
          locationGroups.set(key, []);
        }
        locationGroups.get(key)!.push(visitor);
      }
    });

    // Add markers for each location
    locationGroups.forEach((groupVisitors, locationKey) => {
      const [lat, lng] = locationKey.split(',').map(Number);
      
      if (groupVisitors.length === 1) {
        // Single visitor marker
        const visitor = groupVisitors[0];
        const marker = L.marker([lat, lng])
          .addTo(mapInstanceRef.current!)
          .bindPopup(`
            <div style="font-family: system-ui; color: #333;">
              <strong>${visitor.city || 'Unknown'}, ${visitor.country || 'Unknown'}</strong><br>
              IP: ${visitor.ip || 'Unknown'}<br>
              Browser: ${visitor.browser || 'Unknown'}<br>
              OS: ${visitor.os || 'Unknown'}<br>
              Time: ${visitor.visit_time ? new Date(visitor.visit_time).toLocaleString() : 'Unknown'}
            </div>
          `);
        
        marker.on('click', () => onMarkerClick(visitor));
        markersRef.current.push(marker);
      } else {
        // Multiple visitors at same location
        const marker = L.marker([lat, lng])
          .addTo(mapInstanceRef.current!)
          .bindPopup(`
            <div style="font-family: system-ui; color: #333;">
              <strong>${groupVisitors[0].city || 'Unknown'}, ${groupVisitors[0].country || 'Unknown'}</strong><br>
              <strong>${groupVisitors.length} visitors</strong><br>
              ${groupVisitors.slice(0, 3).map(v => `• ${v.ip || 'Unknown'} (${v.browser || 'Unknown'})`).join('<br>')}
              ${groupVisitors.length > 3 ? `<br>... and ${groupVisitors.length - 3} more` : ''}
            </div>
          `);
        
        marker.on('click', () => onMarkerClick(groupVisitors[0]));
        markersRef.current.push(marker);
      }
    });

    // Fit map to show all markers if there are any
    if (markersRef.current.length > 0) {
      const group = new L.FeatureGroup(markersRef.current);
      mapInstanceRef.current.fitBounds(group.getBounds().pad(0.1));
    }
  }, [visitors, onMarkerClick]);

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        backgroundColor: '#1a1a2e'
      }} 
    />
  );
};

export default MapComponent;
