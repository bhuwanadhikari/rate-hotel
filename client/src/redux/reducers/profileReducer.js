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
   loading: 0
};

export default function (state = initialState, action) {
   switch (action.type){

      case PROFILE_LOADING:
         return {
            ...state,
            loading: state.loading+1
         };

      case GET_PROFILE:
         return {
            ...state,
            profile: action.payload,
            loading: state.loading+1
         };

      case CLEAR_CURRENT_PROFILE:
         return {
            ...state,
            profile: null
         };

      case GET_CURRENT_USER:
         return{
            ...state,
            currentUser: action.payload,
            loading: state.loading+1
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