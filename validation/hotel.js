//Validation for the registration of hotels and hotelProfile
const validator = require('validator');
const isEmpty = require('./is-empty');
const Hotel = require('../models/Hotel');

module.exports = function validateRegisterInput(data){
   let errors = {};

   data.name = !isEmpty(data.name) ? data.name : ''; //data.name has to be string
   data.email = !isEmpty(data.email) ? data.email : '';
   data.handle = !isEmpty(data.handle) ? data.handle : '';

   if(validator.isEmpty(data.name)){
      errors.name = 'Name field should not be empty';
   }
   if(!validator.isLength(data.name, {min: 6, max: 30})){
      errors.name = 'Name must be between 6 and 30 characters';
   }
   if(validator.isEmpty(data.handle)){
      errors.handle = "Handle should not be empty";
   }
   if(!validator.isLength(data.handle,{min: 2, max: 30})){
      errors.handle = "Handle should be 2 to 30 characters long";
   }
   if(validator.isEmpty(data.email)){
      errors.email = 'Email field should not be empty';
   }
   if(!validator.isEmail(data.email)){
      errors.email = 'Email you entered is not valid';
   }

   //Validation from database
   Hotel.findOne({email: data.email}).then(hotel => {
      if(hotel){
         errors.email = 'Email already exists';
      }
   });

   Hotel.findOne({handle: data.handle}).then(hotel => {
      if(hotel){
         errors.handle = 'Handle is taken';
      }
   });





   return {
      errors,
      isValid: isEmpty(errors) //checks if error is empty
   };

};