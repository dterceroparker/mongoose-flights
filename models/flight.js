import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const flightSchema = new Schema({
  arline: {
    type: String,
    enum: ['American', 'Southwest', 'United']
  },
  airport: {
    type: String,
    enum: ['AUS', 'DFW', 'DEN', 'LAX', 'SAN'],
    default: 'DEN'
  },
  flightNo: {
    type: Number,
    min: 10,
    max: 9999
  },
  departs: {
    default: function() {
      // current date stored into variable link: https://stackoverflow.com/questions/6002254/get-the-current-year-in-javascript
      let newDate = new Date() 
      let adjustedDate = newDate.setFullYear(new Date().getFullYear() + 1)
      return adjustedDate
    }
  },  
}, {
  timestamps: true
})

const Flight = mongoose.model('Flight', flightSchema)

export {
  Flight
}