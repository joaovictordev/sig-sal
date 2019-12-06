import React, { useState } from 'react';
import ReactMapGL from 'react-map-gl';
import 'mapbox-gl/dist/mapbox-gl.css';
import './App.css'

function App() {
  const [viewport, setViewport] = useState({
    width: `${100}%`,
    height: `${100}%`,
    latitude: 37.7577,
    longitude: -122.4376,
    zoom: 8
  });
  
  return (
    <ReactMapGL className="Map"
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
    />
  );
}

export default App;
