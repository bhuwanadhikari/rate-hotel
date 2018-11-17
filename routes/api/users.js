const express = require('express');
const gravatar = require('gravatar');
const bcrypt  = require('bcryptjs');
const jwt = require('jsonwebtoken');


const User = require('../../models/User');
const keys = require('../../config/keys');



const router = express.Router();


//USERS
router.get('/test', (req, res) => res.json({msg: 'users works'}));

//POST request
router.post('/register', (req, res) => {
    User.findOne({email: 'req.body.email'})
        .then((user) => {
            if (user) {
                return res.status(400).json({email: "Email already exists"});
            } else {
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
                })
            }
        });
});

//Login request
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    User.findOne({email}).then((user) => {
        if(!user){
            return res.status(404).json({email: 'User not found'});
        }

        bcrypt.compare(password, user.password).then((isMatch) => {
           if(isMatch){
               //Credentials matched
               payload = {id: user.id, email: user.email, avatar: user.avatar};

               jwt.sign(payload, keys.secret, {expiresIn: 36000}, (err, token) => {
                    res.json({success: true, token: 'Bearer '+ token});
               } );
           } else{
               return res.status(400).json({password: "Password incorrect"});
           }
        });
    }).catch(); //error of find one
});

    module.exports = router;