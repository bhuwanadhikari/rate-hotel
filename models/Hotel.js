const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const HotelSchema = new Schema({
   rating: {type: Schema.Types.ObjectId, ref: 'ratings'},
   name:{type: String, required: true},
   email: {type: String, required: true},
   avatar: {type: String},
   bio: {type: String},
   location: {type: String},
   date: {type: Date, default: Date.now}
});

module.exports = Hotel = mongoose.model('hotels', HotelSchema);