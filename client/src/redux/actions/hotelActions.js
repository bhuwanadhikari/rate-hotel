import {
   GET_HOTEL,
   GET_ALL_HOTELS,
   GET_HOME_OBJECT,
   GET_TOP_RATED_HOTELS,
   GET_NEWEST_HOTELS,
   HOTEL_LOADING,
   // HOTEL_NOT_FOUND,
   HOLD_HOTEL,
   GET_ERRORS,
   DO_RATE_LOADING,
   DONE_RATING
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


//Get Home Date
export const getHomeObject = () => (dispatch) => {
   dispatch(setHotelLoading());
   axios.get('/api/hotelProfile/home')
      .then(res => dispatch({
            type: GET_HOME_OBJECT,
            payload: res.data
         })
      )
      .catch(err => dispatch({
         type: GET_HOME_OBJECT,
         payload: {notFound: 'notFound'}
      }));

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

//Get top rated hotels
export const getTopRatedHotels = () => (dispatch) => {
   dispatch(setHotelLoading());
   axios.get('/api/hotelProfile/top-rated')
      .then(res => {
            dispatch({
               type: GET_TOP_RATED_HOTELS,
               payload: res.data
            })
         }
      )
      .catch(err => dispatch({
         type: GET_TOP_RATED_HOTELS,
         payload: {notFound: 'notFound'}
      }));

};

//Get newest hotels
export const getNewestHotels = () => (dispatch) => {
   dispatch(setHotelLoading());
   axios.get('/api/hotelProfile/newest')
      .then(res => {
            dispatch({
               type: GET_NEWEST_HOTELS,
               payload: res.data
            })
         }
      )
      .catch(err => dispatch({
         type: GET_NEWEST_HOTELS,
         payload: {notFound: 'notFound'}
      }));

};

//Do Rating of the hotel
export const doRating = (hotelId, rateData) => dispatch => {
   dispatch({type: DO_RATE_LOADING});
   axios.post(`/api/hotels/rate/${hotelId}`, rateData)
      .then((res) => dispatch({
            type: DONE_RATING,
            payload: res.data
         })
      )
      .catch((err) => dispatch({
         type: GET_ERRORS,
         payload: err.response.data
      }))

};


//Hold hotel
export const holdHotelId = (hotelId) => (dispatch) => dispatch({
   type: HOLD_HOTEL,
   payload: hotelId
});


//Release hotel
export const releaseHotelId = () => (dispatch) => dispatch({
   type: HOLD_HOTEL,
   payload: null
});


export const setHotelLoading = () => {
   return {
      type: HOTEL_LOADING
   };
};

