import {ALERT_REGISTRATION, HIDE_REGMODAL} from '../actions/types';

const initialState = {
   name: null
};

export default function(state = initialState, action){
   switch(action.type){
      case ALERT_REGISTRATION:
         return {...state, name: action.payload};
      case HIDE_REGMODAL:
         return {...state, name: null};
      default:
         return state;
   }
};