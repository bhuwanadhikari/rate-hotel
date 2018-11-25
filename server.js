const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const userProfile = require('./routes/api/userProfile');
const hotels = require('./routes/api/hotels');


const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
const db = require('./config/keys').mongoURL;

//connection to database
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));



const port = process.env.PORT || 5000;



//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);

//Setting up of routes
app.use('/api/users', users);
app.use('/api/userProfile', userProfile);
app.use('/api/hotels', hotels);


app.get('/', (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Server running in port ${port}`));

