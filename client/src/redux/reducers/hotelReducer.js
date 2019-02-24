import {
   GET_HOTEL,
   GET_ALL_HOTELS,
   GET_HOME_OBJECT,
   GET_TOP_RATED_HOTELS,
   GET_NEWEST_HOTELS,
   HOTEL_LOADING,
   HOLD_HOTEL,
   // HOTEL_NOT_FOUND,
   DO_RATE_LOADING,
   DONE_RATING
} from '../actions/types';


const initialState = {
   hotel: null,
   allHotels: null,
   homeObject: null,
   topRatedHotels: null,
   newestHotels: null,
   loading: 0, //loading of all hotels and loading of one hotel
   holdHotelId: null,
   isRateLoading: false
};

export default function(state = initialState, action){
   switch(action.type){

      case GET_HOTEL:
         return {
            ...state,
            hotel: action.payload,
            loading: 1
         };

      case HOTEL_LOADING:
         return {
            ...state,
            loading: true
         };

      case GET_ALL_HOTELS:
         return {
            ...state,
            loading: 11,
            allHotels: action.payload
         };


      case GET_HOME_OBJECT:
         return {
            ...state,
            loading: 114,
            homeObject: action.payload
         };

      case GET_TOP_RATED_HOTELS:
         return {
            ...state,
            loading: 112,
            topRatedHotels: action.payload
         };

      case GET_NEWEST_HOTELS:
         return {
            ...state,
            loading: 113,
            newestHotels: action.payload
         };

      case HOLD_HOTEL:
         return {
            ...state,
            holdHotelId: action.payload
         };
      case DO_RATE_LOADING:
         return { ...state, isRateLoading: true };
      case DONE_RATING:
         return { ...state,
            hotel:{
               ...state.hotel,
               rates:action.payload.rates

            },
            isRateLoading: false };

      default:
         return state;
   }
}
