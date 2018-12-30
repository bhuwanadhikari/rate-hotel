const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');

const users = require('./routes/api/users');
const userProfile = require('./routes/api/userProfile');
const hotels = require('./routes/api/hotels');
const hotelProfile = require('./routes/api/hotelProfile');
const path = require('path');


const app = express();

//body parser middleware
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

//database
const db = require('./config/keys').mongoURL;

//serve static assets if in production
if(process.env.NODE_ENV === 'production'){
   //set static folder
   app.use(express.static('client/build'));

   app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
   });
}

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
app.use('/api/hotelProfile', hotelProfile);

app.get('/', (req, res) => {
   res.send("Hello world");
});

app.listen(port, () => console.log(`Server running in port ${port}`));

