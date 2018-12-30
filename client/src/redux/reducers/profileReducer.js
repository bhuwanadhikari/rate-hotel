import {
   GET_CURRENT_USER,
   GET_PROFILE,
   PROFILE_LOADING,
   CLEAR_CURRENT_PROFILE,
   CLEAR_CURRENT_USER
} from '../actions/types';


const initialState = {
   currentUser: null,
   profile: null,
   profiles: null,
   loading: false
};

export default function (state = initialState, action) {
   switch (action.type){

      case PROFILE_LOADING:
         return {
            ...state,
            loading: true
         };

      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: false
         };

      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null
         };

      case GET_CURRENT_USER:
         return{
            ...state,
            currentUser: action.payload
         };

      case CLEAR_CURRENT_USER:
         return {
            ...state,
            currentUser: null
         };

      default:
         return state;
   }
   
}