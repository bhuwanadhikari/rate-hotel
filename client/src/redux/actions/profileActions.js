import axios from 'axios';


import {
   GET_CURRENT_USER,
   CLEAR_CURRENT_USER,
   CLEAR_CURRENT_PROFILE,
   GET_ERRORS,
   GET_PROFILE,
   PROFILE_LOADING
} from './types';

//Get current Profile
export const getCurrentProfile = () => dispatch => {
   dispatch(setProfileLoading());
   axios
      .get('/api/userProfile')
      .then(res => {

         dispatch({
               type: GET_PROFILE,
               payload: convertProfileObject(res.data)

         }
         )}
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

//Clear current profile
export const clearCurrentUser = () => {
   return {
      type: CLEAR_CURRENT_USER
   };
};

//Edit current profile
export const editCurrentProfile = (profileData) => (dispatch) => {
   axios
      .post('/api/userProfile', profileData)
      .then((res) => {
         dispatch({
            type: GET_PROFILE,
            payload: convertProfileObject(res.data)
         });
         dispatch({
            type: GET_ERRORS,
            payload: {msg: 'cleared'} //just for the errors to be cleared
         });
      })
      .catch((err)=> dispatch({
            type: GET_ERRORS,
            payload: err.response.data
         })
      );
};

//getting whole userData as of User model who is just logged in
export const getCurrentUser = () => (dispatch) => {
   setProfileLoading();
   axios
      .get('api/users/current')
      .then(res => dispatch({
         type: GET_CURRENT_USER,
         payload:res.data
      })).catch(err => dispatch({
         type: GET_ERRORS,
         payload: err.response.data
      })
   )
};


//convert profile object
export const convertProfileObject = (oldObj) => {
   const newObj = {...oldObj, ...oldObj.social};
   delete newObj.social;
   return newObj;
};