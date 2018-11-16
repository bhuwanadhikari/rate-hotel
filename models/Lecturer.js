const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//Lecturer Model
const lecturerSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    commonName: {
      type: String,
      required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now()
    },
    faculty: {
        type: String,
        required: true
    }
});


module.exports = User = mongoose.model('users', UserSchema);