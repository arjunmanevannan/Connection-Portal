const mongoose = require('mongoose');

var connectionSchema = new mongoose.Schema({
  name:{
    type: String
  },
  host:{
    type: Object,
    required: true
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
},{
  versionKey: false
})

module.exports = mongoose.model('connection', connectionSchema);
