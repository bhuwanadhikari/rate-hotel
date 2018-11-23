const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const LecturerSchema = new Schema({
    name:{type: String, required: true},
    commonName: {type: String, required: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    avatar: {type: String},
    handle: {type: String, required: true},
    faculty: {type: String, required: true},
    bio: {type: String},
    location: {type: String},
    subjects: [String],
    date: {type: Date, default: Date.now()},
    ratings: [
        {
            domu:[{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            interactivity: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            punctuality: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            appearance: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            woa: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }]

        }
    ],
    overallRating:{
        type: number,
        default: 0
    }
});

module.exports = Lecturer = mongoose.model('lecturers', LecturerSchema);