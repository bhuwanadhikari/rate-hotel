const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


//Load profile model
const UserProfile = require('../../models/UserProfile');

//Load user model
const User = require('../../models/User');

//USER
router.get('/test', (req, res) => res.json({msg: 'user works'}));


//@route /api/userProfile
// get current user profile
// private
router.get('/',passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    UserProfile.findOne({user: req.user.id}) //req.user's user from stored token's payload
        .then((profile) => {
            if(!profile){
                errors.noProfile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.status(200).json(profile)
        }).catch( (err) => {
            res.status(404).json(err);
    });
});

module.exports = router;