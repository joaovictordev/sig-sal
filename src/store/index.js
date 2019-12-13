import { createStore } from 'redux';

const INITIAL_STATE = {
  drawerVisible: false
}

function reducer(state = INITIAL_STATE, action){
  switch(action.type){
    case 'SHOW_DRAWER':
      return {...state, drawerVisible: true}
    case 'CLOSE_DRAWER':
      return {...state, drawerVisible: false}
    default:
      return state;
  }
}
const store = createStore(reducer);

export default store;