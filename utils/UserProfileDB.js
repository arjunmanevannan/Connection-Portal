const user = require('./../models/User.js')
const userConnection = require('./../models/UserConnection.js')
const userProfile = require('./../models/UserProfile.js')
const connection = require('./../models/Connection.js')

const initUserProfile = function (user){
  var uc = [];
  var up1 = new userProfile(user, uc);
  return up1;
}

const addUserConnection = function (up1, rsvp){
  var uc = [];
  up1._userConnection.push(new userConnection(connection, rsvp));
  return up1;
}

module.exports.initUserProfile = initUserProfile;
module.exports.addUserConnection = addUserConnection;
