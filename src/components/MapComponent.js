import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactMapGL, { Source, Layer } from 'react-map-gl';

import DrawerComponent from './DrawerComponent.js';
import DrawerToggleComponent from './DrawerToggleComponent.js';
import ModalLayerDescription from './ModalLayerDescription.js';
import ModalFeatureProperties from './ModalFeatureProperties.js';

export default function MapComponent() {
  const dispatch = useDispatch();
  const baseLayerActive = useSelector( state => state.baseLayerActive);
  const overlaysActive = useSelector( state => state.overlaysActive);
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
      'fill-opacity': 0.7,
      "fill-outline-color": '#000',
    }
  }

  
  function renderOverlaysActive(overlaysActive) {
    if (overlaysActive !== 0){
      const overlaysToRender = overlaysActive.map(
        overlay => (
          <Source type="geojson" data={overlay} key={overlay.name}>
          <Layer {...dataLayer}/>
          </Source>
        )
      );

      return overlaysToRender;
    }
  }
  
  function clickFeature(e){
    const feature = e.features[0];
    if (feature) {
      dispatch({type: 'SHOW_FEATURE_PROPERTIES', featureProperties: feature.properties});
    }
  }

  return(
    <>
    <ReactMapGL
      {...viewport}
      onViewportChange={viewport => setViewport(viewport)}
      mapboxApiAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
      mapStyle={baseLayerActive}
      onClick={clickFeature}
      interactiveLayerIds={['data']}
    >
      {renderOverlaysActive(overlaysActive)}
    </ReactMapGL>
    <DrawerComponent />
    <DrawerToggleComponent />
    <ModalLayerDescription />
    <ModalFeatureProperties />
    </>
  );
}