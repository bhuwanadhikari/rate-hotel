const express = require('express');
const mongoose = require('mongoose');

const users = require('./routes/api/users');
const user = require('./routes/api/user');
const lecturers = require('./routes/api/lecturers');
const lecturer = require('./routes/api/lecturer');


const app = express();

//database
const db = require('./config/keys').mongoURL;

//connection to mongoose
mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));



const port = process.env.PORT || 5000;


app.use('/api/users', users);
app.use('/api/user', user);
app.use('/api/lecturers', lecturers);
app.use('/api/lecturer', lecturer);


app.get('/', (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Server running in port ${port}`));

