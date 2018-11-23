const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const gravatar = require('gravatar');
const jwt = require('jsonwebtoken');

const Lecturer = require('../../models/Lecturer');
const User = require('../../models/User');

const keys = require('../../config/keys');

const router = express.Router();

//Load Input Validation;
const registerInputValidate = require('../../validation/registerLecturer');
//load

router.post('/register', (req, res) => {
    const {errors, isValid} = registerInputValidate(req.body);
    if(!isValid){
        return res.status(400).json(errors);
    }

    Lecturer.findOne({email: 'req.body.email'})
        .then(lecturer => {
            if(lecturer) {
                errors.email = 'Email already exists';
                return res.status(400).json(errors);
            }else{
                const avatar = gravatar.url(req.body.email,
                    {
                        s: '200',
                        r: 'pg',
                        d: 'mm'
                    });

                const newLecturer = new Lecturer({
                    name: req.body.name,
                    commonName: req.body.commonName,
                    email: req.body.email,
                    avatar,
                    handle: req.body.handle,
                    faculty: req.body.faculty,
                    bio: req.body.bio,
                    location: req.body.location
                });
                if(typeof req.body.subjects !== 'undefined' ){
                    lecturerFields.subjects = req.body.subjects.split(',');
                }
                newLecturer.save()
                    .then(lecturer => {
                        res.json(lecturer);
                    }).catch(err => {
                        res.json(err);
                })
            }
        }).catch(err => res.status(400).json(err));



});

module.exports = router;




