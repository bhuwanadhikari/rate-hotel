const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//User Model
const UserSchema = new Schema({
    name: {
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
        type: String
    },
    date: {
        type: Date,
        default: Date.now()
    },
   ratingsDone: {
      type: Schema.Types.Mixed,
      default: []
   }
});


module.exports = User = mongoose.model('users', UserSchema);