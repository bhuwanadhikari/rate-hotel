const express = require('express');
const mongoose = require('mongoose');


const app = express();

//database
const db = require('./config/keys').mongoURL;

//connection to mongoose

mongoose
    .connect(db, { useNewUrlParser: true })
    .then(() => console.log("Connected to the mongoose"))
    .catch(err => console.log(err));

const port = process.env.PORT || 5000;

app.get('/', (req, res) => res.send("Hello World"));

app.listen(port, () => console.log(`Server running in port ${port}`));

