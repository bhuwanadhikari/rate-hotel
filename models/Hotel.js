const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const average = (data) => {
    let sum = data[0].value+data[1].value+data[2].value+data[3].value+data[4].value;
    return sum/5;
};

const HotelSchema = new Schema({
    name:{type: String, required: true},
    email: {type: String, required: true},
    avatar: {type: String},
    handle: {type: String, required: true},
    bio: {type: String},
    location: {type: String},
    date: {type: Date, default: Date.now()},
    ratings: [
        {
            meal:[{
               //give average value in frontend only.
                dal: [{
                   user: {type: Schema.Types.ObjectId, ref: 'users'},
                   value: {type: Number},
                   date: {type: Date, default: Date.now()}
                }],
                rice: [{
                   user: {type: Schema.Types.ObjectId, ref: 'users'},
                   value: {type: Number},
                   date: {type: Date, default: Date.now()}
                }],
                curry: [{
                   user: {type: Schema.Types.ObjectId, ref: 'users'},
                   value: {type: Number},
                   date: {type: Date, default: Date.now()}
                }],
                chutney: [{
                   user: {type: Schema.Types.ObjectId, ref: 'users'},
                   value: {type: Number},
                   date: {type: Date, default: Date.now()}
                }],
                salad: [{
                   user: {type: Schema.Types.ObjectId, ref: 'users'},
                   value: {type: Number},
                   date: {type: Date, default: Date.now()}
                }],
                sideDish: [{
                   user: {type: Schema.Types.ObjectId, ref: 'users'},
                   value: {type: Number},
                   date: {type: Date, default: Date.now()}
                }]
            }],
            lunch: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            tea: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            expensiveness: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            comfortability: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            hygiene: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            serving: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }],
            freshness: [{
                user: {type: Schema.Types.ObjectId, ref: 'users'},
                value: {type: Number},
                date: {type: Date, default: Date.now()}
            }]

        }
    ],
    overallRating:{
        type: Number,
        default: 0
    }
});

module.exports = Hotel = mongoose.model('hotels', HotelSchema);