const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');

const Hotel = require('../../models/Hotel');
const Rating = require('../../models/Rating');

const {convertToAverageRating, sortByTopRate, sortByDate, sortForHome} = require('../../helpers/backendHelpers');


const router = express.Router();

//@route /api/hotelProfile/all
//get all of the hotels
//public
router.get('/all', (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
      if(!allHotels){
         errors.noHotels = 'There are no hotels at all';
      }
      const newHotelArr = allHotels.map((hotelProfile, index) => {
         const reviews = hotelProfile.reviews.length;
         const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
         return {
            averageRating: hotelAverageRating.toFixed(1),
            _id: hotelProfile.hotel._id,
            name: hotelProfile.hotel.name,
            avatar: hotelProfile.hotel.avatar,
            location: hotelProfile.hotel.location,
            reviews: reviews
         };
      });

      res.status(200).json(newHotelArr);

   })
});


//@route /api/hotelProfile/id/hotel_id
//get hotel by id
//public
router.get('/id/:hotel_id', (req, res) => {
   const errors = {};
   Rating.findOne({hotel: req.params.hotel_id})
      .populate('hotel')
      .then(hotelProfile => {
         if(!hotelProfile){
            errors.noHotel = 'There is no hotel for this ID';
            return res.status(400).json(errors);
         }
         res.status(200).json(hotelProfile);
      }).catch(e =>{
      errors.noHotel = 'There is no hotel for this ID';
      res.status(400).json(errors);

   });
});



//@route /api/hotelProfile/topRated
//get top rated hotels
//private
router.get('/top-rated', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
         if(!allHotels){
            errors.noHotels = 'There are no hotels at all';
         }
         const newHotelArr = allHotels.map((hotelProfile, index) => {
            const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
            return {
               averageRating: hotelAverageRating.toFixed(1),
               _id: hotelProfile.hotel._id,
               name: hotelProfile.hotel.name,
               avatar: hotelProfile.hotel.avatar,
               location: hotelProfile.hotel.location,
               reviews: hotelProfile.reviews.length
            };
         });
         const sortedArray = sortByTopRate(newHotelArr);
         res.status(200).json(sortedArray);

      })
});




//@route /api/hotelProfile/newest
//get newest hotels
//private
router.get('/newest', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
         if(!allHotels){
            errors.noHotels = 'There are no hotels at all';
         }
         console.log("these are all hotels:", allHotels);
         const newHotelArr = allHotels.map((hotelProfile, index) => {
            const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
            return {
               averageRating: hotelAverageRating.toFixed(1),
               date: hotelProfile.hotel.date,
               _id: hotelProfile.hotel._id,
               name: hotelProfile.hotel.name,
               avatar: hotelProfile.hotel.avatar,
               location: hotelProfile.hotel.location,
               reviews: hotelProfile.reviews.length
            };
         });
         const sortedArray = sortByDate(newHotelArr);
         res.status(200).json(sortedArray);

      })
});


router.get('/home', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};

   Rating.find()
      .populate('hotel')
      .lean()
      .then(allHotels => {
         if(!allHotels){
            errors.noHotels = 'There are no hotels at all';
            return res.status(400).json(errors);
         }
         // console.log("these are all hotels:", allHotels);
         const homeObject = {
            // each should have four
            tea: [],
            lunch: [],
            meal: [],
            hygiene: [],
            overall: [],
         };

         const allRatingArray = allHotels.map(hotelProfile => {

         });

         res.json(allHotels);





         // const newHotelArr = allHotels.map((hotelProfile, index) => {
         //    const hotelAverageRating = convertToAverageRating(hotelProfile.rates);
         //    console.log(hotelProfile.rates);
         //    const sortedForHome = sortForHome(hotelProfile.rates);
         //    return {
         //       averageRating: hotelAverageRating.toFixed(1),
         //       date: hotelProfile.hotel.date,
         //       _id: hotelProfile.hotel._id,
         //       name: hotelProfile.hotel.name,
         //       avatar: hotelProfile.hotel.avatar,
         //       location: hotelProfile.hotel.location,
         //       reviews: hotelProfile.reviews.length
         //    };
         // });

      })
});


//@route /api/hotelProfile/hotelid
//get hotel by id
//public
// router.get('/handle/:handle', (req, res) => {
//    const errors = {};
//
//
//    Rating.findOne({handle: req.params.handle})
//       .populate('hotel')
//       .then(hotel => {
//          if(!hotel){
//             errors.noHotel = 'There is no hotel for this handle';
//             return res.status(400).json(errors);
//          }
//          res.status(200).json(hotel);
//       }).catch(e =>{
//       errors.noHotel = 'There is no hotel for this hotel';
//       res.status(400).json(errors);
//
//    });
// });


module.exports = router;
