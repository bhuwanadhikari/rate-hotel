const express = require('express');
const gravatar = require('gravatar');
const passport = require('passport');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');

const Hotel = require('../../models/Hotel');
const Rating = require('../../models/Rating');

const router = express.Router();

//Load Input Validation;
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
            Hotel.findOne({handle: req.body.handle})
               .then(hotel => {
                  if(hotel){
                     errors.handle = 'Handle is taken';
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
                        handle: req.body.handle,
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
         }
      }).catch();



});

//@route /api/hotels/rate
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


      const keyArr =['dal', 'rice', 'curry', 'chutney', 'salad', 'sideDish', 'lunch', 'tea', 'expensiveness', 'vif', 'comfortability', 'hygiene', 'serving', 'freshness'];

      for(let key in keyArr) {
         key = keyArr[key];
         key = key.toString();
         if ((rating.rates[key].filter(rate => rate.user.toString() === req.user.id).length > 0) && req.body[key]) {

             errors[key] = `You have already rated ${key}`;

            rating.rates[key] = rating.rates[key].filter(rate=>rate.user.toString() !== req.user.id);
         }

         if (req.body[key]) {
            const object = {};
            object.user = req.user.id;
            object.value = req.body[key];
            rating.rates[key].unshift(object);
         }
      }



      rating.save().then(rating => {
         res.status(200).json({rating, errors});
      }).catch((e) => {
         errors.msg = 'Cannot do the rating';
         res.status(400).json(errors);
      })
   }).catch();
});



module.exports = router;









/*

const ratingsObject = new Rating({
   meal
});
if(req.body.dal){ratingsObject.meal.dal[] = req.body.dal}
if(req.body.rice){ratingsObject.meal.rice = req.body.rice}
if(req.body.curry){ratingsObject.meal.curry = req.body.curry}
if(req.body.chutney){ratingsObject.meal.chutney = req.body.chutney}
if(req.body.salad){ratingsObject.meal.salad = req.body.salad}
if(req.body.sideDish){ratingsObject.meal.sideDish = req.body.sideDish}
if(req.body.lunch){ratingsObject.lunch = req.body.lunch}
if(req.body.tea){ratingsObject.tea = req.body.tea}
if(req.body.expensiveness){ratingsObject.expensiveness = req.body.expensiveness}
if(req.body.vif){ratingsObject.vif = req.body.vif}
if(req.body.comfortability){ratingsObject.comfortability = req.body.comfortability}
if(req.body.hygiene){ratingsObject.hygiene = req.body.hygiene}
if(req.body.serving){ratingsObject.serving = req.body.serving}
if(req.body.freshness){ratingsObject.freshness = req.body.freshness}

*/
