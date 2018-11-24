const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const Lecturer = require('../../models/Lecturer');

const router = express.Router();

//Load Input Validation;
const ValidateRegisterInput = require('../../validation/registerLecturer');


router.post('/registerLecturer', (req, res) => {
   const {errors, isValid} = ValidateRegisterInput(req.body);
   if(!isValid){
      return res.status(400).json(errors);
   }

   Lecturer.findOne({email: req.body.email})
      .then(lecturer1 =>{
         if(lecturer1){
            errors.email = 'Email already exists';
            return res.status(400).json(errors);
         }else{
            Lecturer.findOne({handle: req.body.handle})
               .then(lecturer2 => {
                  if(lecturer2){
                     errors.handle = 'Handle is taken';
                     return res.status(400).json(errors);
                  }else{
                     const avatar = gravatar.url(req.body.email,{
                        s:'200',
                        r: 'pg',
                        d: 'mm'
                     });
                     const newLecturer = new Lecturer({

                        name: req.body.name,
                        email: req.body.email,
                        faculty: req.body.faculty,
                        avatar,
                        handle: req.body.handle,
                        bio: req.body.bio,
                        location: req.body.location
                     });

                     if(typeof req.body.subjects !== 'undefined'){
                        newLecturer.subjects = req.body.subjects.split(',');
                     }

                     newLecturer.save()
                        .then(lecturer => res.json(lecturer))
                        .catch(err => res.json(err));

                  }
               }).catch();
         }
      }).catch();
});




module.exports = router;




