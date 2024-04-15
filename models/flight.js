import mongoose from 'mongoose'

// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema

const todoSchema = new Schema({
  arline: {
  type: String,
  enum: ['American', 'Southwest', 'United']
  }
})