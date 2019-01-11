import {
   GET_HOTEL,
   GET_HOTELS,
   HOTEL_LOADING,
   HOTEL_NOT_FOUND
} from '../actions/types';


const initialState = {
   hotel: null,
   hotels: null,
   loading: false
};

export default function(state = initialState, action){
   switch(action.type){

      case GET_HOTEL:
         return {
            ...state,
            hotel: action.payload,
            loading: false
         };

      case HOTEL_LOADING:
         return {
            ...state,
            loading: true
         };
      case GET_HOTELS:
         return {
            ...state,
           loading: false,
           hotels: action.payload
         };

      default:
         return state;
   }
}