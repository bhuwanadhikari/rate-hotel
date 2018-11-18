const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const user = require('./routes/api/user');


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

//Setting up of routes
app.use('/api/users', users);
app.use('/api/user', user);


//Passport middleware
app.use(passport.initialize());

//Passport config
require('./config/passport')(passport);


app.get('/', (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Server running in port ${port}`));

