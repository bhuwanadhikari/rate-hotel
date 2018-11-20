const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,  //capital string here in mongoose
        required: true,
        maxLength: 40
    },
    location: {
        type: String
    },
    year: {
        type: String,
        required: true
    },
    bio: {
        type: String
    },
    nRating: {
        type: Number
    },
    aRating: {
        type: Number
    },
    social: {
        twitter: {
            type: String
        },
        linkedIn: {
            type: String
        },
        github: {
            type: String
        },
        facebook: {
            type: String
        }
    }
});

module.exports = UserProfile = mongoose.model('userProfile', UserProfileSchema);