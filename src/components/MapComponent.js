import React, { useState } from 'react';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import DrawerComponent from './DrawerComponent.js';
import DrawerToggleComponent from './DrawerToggleComponent.js';
import quadrasGeojson from '../data/quadras.json';

export default function MapComponent() {
  const [viewport, setViewport] = useState({
    width: '100%',
    height: '100%',
    latitude: -5.039647,
    longitude: -37.199707,
    zoom: 10
  });

  const dataLayer = {
    id: 'data',
    type: 'fill',
    paint: {
      'fill-color': {
        property: 'id',
        stops: [
          [40, '#00f'],
          [80, '#0f0'],
          [120, '#f00'],
        ]
      },
      'fill-opacity': 0.8
    }
  };

  return(
    <>
    <ReactMapGL
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle="mapbox://styles/mapbox/satellite-streets-v11"
    >
      <Source type="geojson" data={quadrasGeojson}>
        <Layer {...dataLayer}/>
      </Source>
    </ReactMapGL>
    <DrawerComponent />
    <DrawerToggleComponent />
    </>
  );
}