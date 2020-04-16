const mongoose = require('mongoose');

var userConnectionSchema = new mongoose.Schema({
  connection:{
    type: Object,
    required: true
  },
  rsvp:{
    type: String,
    required: true
  }
},{
  versionKey: false
})

module.exports = mongoose.model('useronnection', userConnectionSchema);
