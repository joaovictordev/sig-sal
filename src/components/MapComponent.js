import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import DrawerComponent from './DrawerComponent.js';
import DrawerToggleComponent from './DrawerToggleComponent.js';
import salinasApodiMossoro from '../data/salinas_apodi_mossoro.json';

export default function MapComponent() {
  const baseLayerActive = useSelector( state => state.baseLayerActive);
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: -5.039647,
    longitude: -37.199707,
    zoom: 11
  });

  const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': '#f00',
      'fill-opacity': 0.8
    }
  }

  return(
    <>
    <ReactMapGL
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
    >
      <Source type="geojson" data={salinasApodiMossoro}>
        <Layer {...dataLayer}/>
      </Source>
    </ReactMapGL>
    <DrawerComponent />
    <DrawerToggleComponent />
    </>
  );
}