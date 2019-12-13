import React from 'react';
import { Provider } from 'react-redux';
import 'mapbox-gl/dist/mapbox-gl.css';
import 'antd/dist/antd.css'

import MapComponent from './components/MapComponent.js';
import store from './store';
import './App.css';

function App() {
  
  return (
    <Provider store={store}>
      <MapComponent>
      </MapComponent>
    </Provider>
  );
}

export default App;
