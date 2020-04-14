const mongoose = require('mongoose');

var connectionSchema = new mongoose.Schema({
  connectionID:{
    type: String
  },
  name:{
    type: String
  },
  host:{
    type: String
  },
  topic:{
    type: String
  },
  details:{
    type: String
  },
  date:{
    type: Date
  },
  time:{
    type: String
  }
})

mongoose.model('Connection', connectionSchema);
