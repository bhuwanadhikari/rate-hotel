const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const passport = require('passport');


const validateUserProfileInput = require('../../validation/userProfile');

//-----------------------------------------------
mongoose.set('useFindAndModify', false);//------- can be removed after mongoose updates
//-----------------------------------------------

//Load profile model
const UserProfile = require('../../models/UserProfile');

//Load user model
const User = require('../../models/User');


//@route /api/userProfile/handle/:handle
// get any user profile by handle
// public
router.get('/handle/:handle', (req, res) => {
    const errors = {};
    UserProfile.findOne({handle: req.params.handle}) //handle in the params
        .populate('user', ['name', 'avatar', 'faculty'])
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


//@route /api/userProfile/user/:id
// get  profile by user id
// public
router.get('/user/:user_id', (req, res) => {
    const errors = {};
    UserProfile.findOne({user: req.params.user_id})
        .populate('user', ['name', 'avatar', 'faculty'])
        .then((profile) => {
            if(!profile){
                errors.noProfile = 'There is no profile for this user';
                res.status(404).json(errors);
            }
            res.status(200).json(profile);
        }).catch( (err) => {
        res.status(404).json(err);
    });
});


//@route /api/userProfile/all
// get all userProfiles
// public
router.get('/all', (req, res) => {
    const errors = {};
    UserProfile.find()
        .populate('user', ['name', 'avatar', 'faculty'])
        .then(profiles => {
            if(!profiles){
                errors.noProfile = 'There are no profiles';
                return res.status(404).json(errors);
            }
            res.json(profiles);
        }).catch( (err) => {
        res.status(404).json(err);
    });
});









//@route /api/userProfile
// get current user profile
// private
router.get('/',passport.authenticate('jwt', {session:false}), (req, res) => {
    const errors = {};
    UserProfile.findOne({user: req.user.id}) //req.user's user from stored token's payload
        .populate('user', ['name', 'avatar', 'faculty'])
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

    //destructuring
    const {errors, isValid}  = validateUserProfileInput(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }


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



    UserProfile.findOne({user: req.user.id}).then((profile) => {
        if(profile){
            //Update
            UserProfile.findOneAndUpdate(
                {user: req.user.id},
                {$set: profileFields},
                {new: true}
            ).then((profile) => {
                res.json(profile);
            }).catch(err => res.status(400).json(err))
        }else{
            //create
            //check if handle exists
            UserProfile.findOne({handle: profileFields.handle}).then((profile) => {
                if(profile){
                    res.status(400).json('Handle already exists');
                }
                new UserProfile(profileFields).save().then((profile) => {
                    res.json(profile)
                });
            }).catch(err = res.statu(400).json(err));
        }
    }).catch(err => res.json(err));
});





//@route /api/userProfile
// delete logged in userProfile
// private
router.delete('/', passport.authenticate('jwt', {session: false}), (req, res)=>{
        UserProfile.findOneAndRemove({user: req.user.id})
            .then(() => {
                User.findOneAndRemove({_id: req.user.id}).then(() => {
                    res.json({success: true});
                }).catch(err => res.status(400).json(err));
            }).catch(err => res.status(400).json(err));
});



module.exports = router;