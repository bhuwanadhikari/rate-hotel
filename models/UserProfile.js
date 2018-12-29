const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserProfileSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'users'
    },
    handle: {
        type: String,  //capital string here in mongoose
        required: true
    },
    location: {
        type: String
    },
    bio: {
        type: String
    },
    social: {
       facebook: {
          type: String
       },
        twitter: {
            type: String
        },
        linkedIn: {
            type: String
        },
        instagram: {
            type: String
        }
    }
});

module.exports = UserProfile = mongoose.model('userProfile', UserProfileSchema);