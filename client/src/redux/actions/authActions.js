import {
   GET_ERRORS,
   SET_CURRENT_USER,
   ALERT_REGISTRATION,
   HIDE_REGMODAL
} from './types';
import setAuthToken from '../../utils/setAuthToken';
import jwt_decode from 'jwt-decode';


import axios from 'axios';

//Register
export const registerUser = (userData, history) => dispatch => {

   axios.post('api/users/register', userData)
      .then(res => {
         history.push('/login');
         dispatch({
            type: ALERT_REGISTRATION,
            payload: res.data.name
         });
         }
      )
      .catch(err => dispatch({
         type: GET_ERRORS,
         payload: err.response.data})
      );

};


//Hide registration modal
export const hideRegModal = () => dispatch =>  {
   dispatch({
      type: HIDE_REGMODAL,
      payload: null
   });
};


//Login
export const loginUser = (userData) => dispatch => {
   axios.post('api/users/login', userData)
      .then(res => {
         const { token } = res.data;
         //Save token to local storage
         localStorage.setItem('jwtToken', token);
         //Set Auth header
         setAuthToken(token);
         //Decode token to get current user data
         const decoded = jwt_decode(token);

         dispatch(setCurrentUser(decoded));

      })
      .catch(err => (dispatch({
            type: GET_ERRORS,
            payload: err.response.data}))
      );
};


//set current user function
export const setCurrentUser = (decoded) => {
   return {
      type: SET_CURRENT_USER,
      payload: decoded
   };
};


//Log User Out
export const logUserOut = () => dispatch => {
   //Delete token
   localStorage.removeItem('jwtToken');
   //Remove auth header
   setAuthToken(false);
   //Set current user to {}
   dispatch(setCurrentUser({})); //dispatch to update the store
   //
};

