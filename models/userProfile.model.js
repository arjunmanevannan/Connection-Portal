const mongoose = require('mongoose');

var userProfileSchema = new mongoose.Schema({
  user:{
    type: Object,
    required: true
  },
  userConnection:{
    type: Array,
    default: []
  }
})

module.exports = mongoose.model('userprofile', userProfileSchema);
