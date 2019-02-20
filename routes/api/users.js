const express = require('express');
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');

//Load Splash Validation
const validateRegisterInput = require('../../validation/register');
const validateLoginInput =  require('../../validation/login');


const User = require('../../models/User');

const keys = require('../../config/keys');



const router = express.Router();



//@route api/users/register
// register a new user
// access public
router.post('/register', (req, res) => {

   const {errors, isValid} = validateRegisterInput(req.body);
   //check validation
   if(!isValid){
      return res.status(400).json(errors);
   }


   User.findOne({email: req.body.email}).then(user => {
      if(user){
         errors.email = 'Email already exists';
         return res.status(400).json(errors);
      }else{
         const avatar = gravatar.url(req.body.email, {
            s: '200',
            r: 'pg',
            d: 'mm'
         });
         const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            avatar,
            faculty: req.body.faculty
         });

         bcrypt.genSalt(10, (err, salt) => {
            bcrypt.hash(newUser.password, salt, (err, hash) => {
               if (err) throw err;
               newUser.password = hash;
               
               newUser
                  .save()
                  .then(user => res.json(user))
                  .catch(err => console.log(err));
            });
         });
      }
   });
});

//@route api/users/login
// return token back which is sent as header to authenticate
// access public
router.post('/login', (req, res) => {

   //Validation of Login Splash
   const {errors, isValid} = validateLoginInput(req.body);
   if(!isValid){
      return res.status(401).json(errors);
   }

   const email = req.body.email;
   const password = req.body.password;
   User.findOne({email}).then((user) => {
      if(!user){
         errors.email = 'User not found';
         return res.status(401).json(errors);
      }

      bcrypt.compare(password, user.password).then((isMatch) => {
         if(isMatch){
            //Credentials matched
            payload = {id: user.id, name:user.name, email: user.email, avatar: user.avatar, faculty: user.faculty};

            jwt.sign(payload, keys.secret, {expiresIn: 36000}, (err, token) => {
               res.json({success: true, token: 'Bearer '+ token});
            } );
         } else{
            errors.password = 'Password Incorrect';
            return res.status(401).json(errors);
         }
      });
   }).catch(); //error of find one
});

//@route api/users/current
// return current user
// access private
router.get('/current',passport.authenticate('jwt',{session:false}),(req, res)=>{
   const errors = {};
   User.findOne({_id: req.user.id}).then(user => {
      if(!user) {
         errors.noProfile = 'There is no profile for this user';
         return res.status(400).json(errors);
      }
      let currentUser = {
         _id: user._id,
         name: user.name,
         avatar: user.avatar,
         ratingsDone: user.ratingsDone
      };
      res.json(currentUser);
   }).catch((err) => {
      res.status(400).json(currentUser);
   });
});

module.exports = router;