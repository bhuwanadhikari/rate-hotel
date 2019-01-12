import {
   GET_HOTEL,
   GET_ALL_HOTELS,
   HOTEL_LOADING,
   HOTEL_NOT_FOUND
} from './types';

import axios from 'axios';


//Get single hotel profile from id
export const getHotelById = (id) => (dispatch) => {
   dispatch(setHotelLoading());
  axios.get(`/api/hotelProfile/id/${id}`)
     .then(res => dispatch({
        type: GET_HOTEL,
        payload: res.data
     })).catch(err => dispatch({
     type: GET_HOTEL,
     payload: {notFound: 'notFound'}
  }))
};


//Get all hotels
export const getAllHotels = () => (dispatch) => {
   dispatch(setHotelLoading());
   axios.get('/api/hotelProfile/all')
      .then(res => dispatch({
         type: GET_ALL_HOTELS,
         payload: res.data
         })
      )
      .catch(err => dispatch({
         type: GET_ALL_HOTELS,
         payload: {notFound: 'notFound'}
      }));

};

export const setHotelLoading = () => {
   return {
      type: HOTEL_LOADING
   };
};

