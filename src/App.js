import React from 'react';
import { Provider } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.css'

import MapComponent from './components/MapComponent.js';
import ModalLayerDescription from './components/ModalLayerDescription.js';
import store from './store';
import './App.css';

function App() {
  
  return (
    <Provider store={store}>
      <MapComponent />
      <ModalLayerDescription />
    </Provider>
  );
}

export default App;
