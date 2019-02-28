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

   if(req.body.myPin !== process.env.MY_PIN){
      errors.myPin = 'Invalid pin';
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

//@route /api/hotels/review/:id
//post review to a hotel
//private
router.post('/review/:id', passport.authenticate('jwt', {session: false}), (req, res) => {
   const errors = {};
   Rating.findOne({hotel: req.params.id}).then((rating) => {
      if(!rating){
         errors.noRating= 'Neither Hotel nor Rating found';
         return res.status(400).json(errors);
      }

      if(req.body.review){

         const newReviewData = {};
         newReviewData.user= req.user.id;
         newReviewData.review = req.body.review;
         rating.reviews.unshift(newReviewData);

         //save to database
         rating.save().then(rating => {
            res.status(200).json({reviews: rating.reviews});
         }).catch((e) => {
            res.status(400).json(errors);
         })
      }
   })
});



//@route /api/hotels/mail-hotel-data
//mail hotel data to admin
//public
router.post('/mail-hotel-data', (req,res) => {
// async..await is not allowed in global scope, must use a wrapper


   const {errors, isValid} = ValidateRegisterInput(req.body);
   if(!isValid){
      return res.status(400).json(errors);
   }


   "use strict";
   const nodemailer = require('nodemailer');


      // create reusable transporter object using the default SMTP transport
      let transporter = nodemailer.createTransport({
         service: "Gmail",
          // true for 465, false for other ports
         auth: {
            user: process.env.CROWAPP_EMAIL,
            pass: process.env.SECRET_OR_KEY,
         }
      });


      // setup email data with unicode symbols
      let mailOptions = {
         from: 'thecrowapp@gmail.com', // sender address
         to: "adhikaribhuwan97@gmail.com", // list of receivers
         subject: "Add hotel to CrowpApp server", // Subject line
         text: `Data of Hotel to be posted`, // plain text body
         html: `<div>
         <div><b>Name of Hotel: </b>${req.body.name}</div>
         <div><b>Location of Hotel: </b>${req.body.location}</div>
         <div><b>Email of owner: </b>${req.body.email}</div>
         <div><b>Description of Hotel: </b>${req.body.bio}</div>
      </div>` // html body
      };

      // send mail with defined transport object
      transporter.sendMail(mailOptions, (error, info)=> {
         if(error){
             res.status(400).json({success: false});
         } else{
             res.status(200).json({success: true});

         }
      });

});

module.exports = router;

