const express = require('express');
const gravatar = require('gravatar');
const passport = require('passport');
const jwt = require('jsonwebtoken');

const Hotel = require('../../models/Hotel');
const Rating = require('../../models/Rating');
const {convertToAverageRating} = require('../../helpers/backendHelpers');

const router = express.Router();

//Load Splash Validation;
const ValidateRegisterInput = require('../../validation/hotel');

//@route /api/hotels/register
//register new hotel
//public
router.post('/register', (req, res) => {
   const {errors, isValid} = ValidateRegisterInput(req.body);
   if(!isValid){
      return res.status(400).json(errors);
   }

   Hotel.findOne({email: req.body.email})
      .then(hotel =>{
         if(hotel){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
         }else{
            const avatar = gravatar.url(req.body.email,{
               s:'200',
               r: 'pg',
               d: 'mm'
            });


            const newHotel = new Hotel({

               name: req.body.name,
               email: req.body.email,
               avatar,
               bio: req.body.bio,
               location: req.body.location
            });

            //First register the hotel
            newHotel.save().then(hotel =>{

               const newRating = new Rating({
                  hotel: hotel._id
               });

               newRating.save().then(rating =>{
                  const hotelProfile = {hotel, rating};
                  res.json(hotelProfile);
               }).catch(err => res.json(err));

            }).catch(err => res.json(err));
         }
      }).catch();



});

//@route /api/hotels/rate/:id
//rate the hotel
//private
router.post('/rate/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

   const errors = {}; // validate the comments
// start from here
   Rating.findOne({hotel: req.params.id}).then( rating => {
      if(!rating){
         errors.noRating = 'Neither Hotel nor rating found';
         return res.status(400).json(errors);
      }
      //check if user already exists in array of objects


      const ratingItems =['dal', 'rice', 'curry', 'chutney', 'salad', 'sideDish', 'lunch', 'tea', 'expensiveness', 'vif', 'comfortability', 'hygiene', 'serving', 'freshness'];

      for(let key in ratingItems) {
         key = ratingItems[key];
         key = key.toString();
         if ((rating.rates[key].filter(rate => rate.user.toString() === req.user.id).length > 0) && req.body[key]) {
            errors[key] = `You have already rated ${key}`;
            //edit rates as you have already rated
            rating.rates[key] = rating.rates[key].filter(rate=>rate.user.toString() !== req.user.id);
         }

         if (req.body[key]) {
            const rateData = {};
            rateData.user = req.user.id;
            rateData.value = req.body[key];
            rating.rates[key].unshift(rateData);
         }
      }



      rating.save().then(rating => {
         res.status(200).json({rates:rating.rates});
      }).catch((e) => {
         errors.msg = 'Cannot do the rating';
         res.status(400).json(errors);
      })
   }).catch();
});


//@route /api/hotelProfile/top-rated
//register new hotel
//public
// router.get('/top-rated', (req, res) => {
//    const errors = {};
//
//    Rating.find()
//       .populate('hotel')
//       .then(allHotels => {
//          if(!allHotels){
//             errors.noHotels = 'There are no hotels at all';
//          }
//
//          const newHotelArr = allHotels.map((hotelProfile) => {
//             const reviews = hotelProfile.reviews.length;
//             return {
//                hotelAverageRating: convertToAverageRating(hotelProfile.rates),
//                _id: hotelProfile.hotel.id,
//                name: hotelProfile.hotel.name,
//                avatar: hotelProfile.hotel.avatar,
//                location: hotelProfile.hotel.location,
//                reviews: hotelProfile.reviews.length
//             };
//          });
//
//          res.status(200).json(newHotelArr);
//
//       })
// });

//@route /api/hotelProfile/newest
//register new hotel
//public
// router.get('/all', (req, res) => {
//    const errors = {};
//
//    Rating.find()
//       .populate('hotel')
//       .then(allHotels => {
//          if(!allHotels){
//             errors.noHotels = 'There are no hotels at all';
//          }
//
//          const newHotelArr = allHotels.map((hotelProfile) => {
//             const reviews = hotelProfile.reviews.length;
//             return {
//                averageRating: (Math.random()*5).toFixed(1),
//                _id: hotelProfile.hotel.id,
//                name: hotelProfile.hotel.name,
//                avatar: hotelProfile.hotel.avatar,
//                location: hotelProfile.hotel.location,
//                reviews: (Math.random()*1000).toFixed(0)
//             };
//          });
//
//          res.status(200).json(newHotelArr);
//
//       })
// });


//@route /api/hotelProfile/recommended
//hotels to display in home
//public
// router.get('/all', (req, res) => {
//    const errors = {};
//
//    Rating.find()
//       .populate('hotel')
//       .then(allHotels => {
//          if(!allHotels){
//             errors.noHotels = 'There are no hotels at all';
//          }
//
//          const newHotelArr = allHotels.map((hotelProfile) => {
//             const reviews = hotelProfile.reviews.length;
//             return {
//                averageRating: (Math.random()*5).toFixed(1),
//                _id: hotelProfile.hotel.id,
//                name: hotelProfile.hotel.name,
//                avatar: hotelProfile.hotel.avatar,
//                location: hotelProfile.hotel.location,
//                reviews: (Math.random()*1000).toFixed(0)
//             };
//          });
//
//          res.status(200).json(newHotelArr);
//
//       })
// });



module.exports = router;

