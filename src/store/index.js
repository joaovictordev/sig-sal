import { createStore } from 'redux';
import salinasApodiMossoro from '../data/salinas_apodi_mossoro.json';

const INITIAL_STATE = {
  drawerVisible: false,
  layerDescriptionVisible: false,
  featureProperties: {},
  featurePropertiesVisible: false,
  baseLayers: [
    {label: 'Streets', value: 'mapbox://styles/mapbox/streets-v11'},
    {label: 'Satellite', value: 'mapbox://styles/mapbox/satellite-streets-v11'}
  ],
  baseLayerActive: 'mapbox://styles/mapbox/streets-v11',
  overlays: [salinasApodiMossoro],
  overlaysActive: []
}

function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SHOW_DRAWER':
      return {...state, drawerVisible: true}
    case 'CLOSE_DRAWER':
      return {...state, drawerVisible: false}

    case 'SHOW_LAYER_DESCRIPTION':
      return {...state, layerDescriptionVisible: true}
    case 'CLOSE_LAYER_DESCRIPTION':
      return {...state, layerDescriptionVisible: false}

    case 'SHOW_FEATURE_PROPERTIES':
      return {...state, featurePropertiesVisible: true, 
            featureProperties: action.featureProperties
      }
    case 'CLOSE_FEATURE_PROPERTIES':
      return {...state, featurePropertiesVisible: false}

    case 'CHANGE_BASELAYER':
      return {...state, baseLayerActive: action.baseLayerActive}

    case 'CHANGE_OVERLAYS_ADD':
      const filteredAdd = state.overlays.filter( overlay => {
        return overlay.name === action.overlayToAdd
      })
      return {...state, overlaysActive: [...state.overlaysActive, filteredAdd[0]]}
    case 'CHANGE_OVERLAYS_REMOVE':
      const filteredRemove = state.overlaysActive.filter((overlay) => {
        return overlay.name !== action.overlayToRemove;
      });
      return {...state, overlaysActive: filteredRemove}

    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;