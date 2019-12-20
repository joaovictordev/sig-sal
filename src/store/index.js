import { createStore } from 'redux';

const INITIAL_STATE = {
  drawerVisible: false,
  layerDescriptionVisible: false,
  baseLayerActive: 'Streets',
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
    case 'CHANGE_BASELAYER':
      return {...state, baseLayerActive: action.baseLayerActive}
    case 'CHANGE_OVERLAYS':
      return {...state, overlaysActive: action.overlaysActive}
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;