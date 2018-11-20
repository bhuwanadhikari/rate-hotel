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


//@route /api/userProfile
// create or edit current userProfile
// private
router.post('/',passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    //get fields
    const profileFields = {};
    profileFields.user = req.user.id;
    if(req.body.handle) profileFields.handle = req.body.handle;
    if(req.body.location) profileFields.location = req.body.location;
    if(req.body.year) profileFields.year = req.body.year;
    if(req.body.bio) profileFields.bio = req.body.bio;
    if(req.body.nRating) profileFields.nRating = req.body.nRating;
    if(req.body.aRating) profileFields.aRating = req.body.aRating;

    profileFields.social = {};

    if(req.body.twitter) profileFields.social.twitter = req.body.twitter;
    if(req.body.linkedin) profileFields.social.linkedin = req.body.linkedin;
    if(req.body.github) profileFields.social.github = req.body.github;
    if(req.body.facebook) profileFields.social.facebook = req.body.facebook;

    Profile.findOne({user: req.user.id}).then((profile) => {
        if(profile){
            //Update
            Profile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            ).then((profile) => {
                res.json(profile);
            })
        }else{
            //create
            //check if handle exists
            Profile.findOne({handle: profileFields.handle}).then((profile) => {
                if(profile){
                    errors.handle = 'Handle already exists';
                    res.status(400).json(errors);
                }
                new Profile(profileFields).save().then((profile) => {
                    res.json(profile)
                })

            });
        }
    })

});
module.exports = router;