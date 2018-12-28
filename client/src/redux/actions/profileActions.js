import axios from 'axios';


import {
   CLEAR_CURRENT_PROFILE,
   GET_PROFILE,
   PROFILE_LOADING
} from './types';

//Get current Profile
export const getCurrentProfile = () => dispatch => {
   dispatch(setProfileLoading());
   axios
      .get('/api/userProfile')
      .then(res =>
         dispatch({
            type: GET_PROFILE,
            payload: res.data
         })
      )
      .catch(err =>
         dispatch({
            type: GET_PROFILE,
            payload: {notFound: 'Not found'}
         })
      );
};


//Set profile loading
export const setProfileLoading = () => {
   return {
      type: PROFILE_LOADING
   };
};

//Clear current profile
export const clearCurrentProfile = () => {
   return {
      type: CLEAR_CURRENT_PROFILE,

   };
};