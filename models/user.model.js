const mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
  isHost:{
    type: Boolean,
    default: false
  },
  userID:{
    type: String
  },
  firstName:{
    type: String,
    required: true
  },
  lastName:{
    type: String,
    required: true
  },
  emailAddress:{
    type: String,
    required: true
  },
  addressLine1:{
    type: String
  },
  addressLine2:{
    type: String
  },
  city:{
    type: String
  },
  state:{
    type: String
  },
  zip:{
    type: String
  },
  country:{
    type: String
  }
})

module.exports = mongoose.model('user', userSchema);
