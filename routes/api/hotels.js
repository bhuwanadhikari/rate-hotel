const express = require('express');
const gravatar = require('gravatar');

const Hotel = require('../../models/Hotel');

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

   Hotel.findOne({email: req.body.email}).then( hotel => {
      if(hotel){
         errors.email = 'Email already exists';
         return res.status(400).json(errors);
      }
   });

   Hotel.findOne({handle: req.body.handle}).then( hotel => {
      if(hotel){
         errors.handle = 'Handle already exists';
         return res.status(400).json(errors);
      }
   });

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

   newHotel.save()
      .then(lecturer => res.json(lecturer))
      .catch(err => res.json(err));




});




module.exports = router;



