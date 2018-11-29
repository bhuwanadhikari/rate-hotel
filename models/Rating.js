const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const RatingSchema = new Schema(
   {
      hotel: {
         type: Schema.Types.ObjectId,
         ref: 'hotels'
      },
      rates: {
         //give average value of meal in frontend only.
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
         vif: [{ //variability in food
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
      },
      comments: [{ //or say compliments in frontend
         writer: {type: String},
         user: {type: Schema.Types.ObjectId, ref: 'users'},
         commentUp: {type: String},
         commentDown: {type: String},
         avatar: {type: String},
         date: {type: Date, default: Date.now()}
      }]

   }
);

module.exports = Rating = mongoose.model('ratings', RatingSchema);