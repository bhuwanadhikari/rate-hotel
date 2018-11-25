const mongoose = require('mongoose');
const express = require('express');

const Hotel = require('../../models/Hotel');


const router = express.Router();


router.get('/all', (req, res) => {
   const errors = {};
   Hotel.find().then(hotels => {
      if(!hotels){
         errors.noHotels = 'There are no hotels at all';
      }
      res.status(200).json(hotels);
   })
});

module.exports = router;