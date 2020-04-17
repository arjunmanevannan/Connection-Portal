const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  isHost:{
    type: Boolean,
    default: false
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
},{
  versionKey: false
});


const connectionSchema = new mongoose.Schema({
  name:{
    type: String
  },
  host:userSchema,
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
});

const userConnectionSchema = new mongoose.Schema({
  connection:connectionSchema,
  rsvp:{
    type: String,
    required: true
  }
},{
  versionKey: false
});

const userProfileSchema = new mongoose.Schema({
  user:userSchema,
  userConnection:[userConnectionSchema]
},{
  versionKey: false
});


let user = mongoose.model('user', userSchema);
let connection = mongoose.model('connection', connectionSchema);
let userconnection = mongoose.model('userConnection', userConnectionSchema);
let userprofile = mongoose.model('userprofile', userProfileSchema);

module.exports.userModel = user;
module.exports.connectionModel = connection;
module.exports.userconnectionModel = userconnection;
module.exports.userprofileModel = userprofile;
