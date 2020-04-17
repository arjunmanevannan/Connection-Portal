const user = require('./../models/User.js')
const userConnection = require('./../models/UserConnection.js')
const userProfile = require('./../models/UserProfile.js')
const connection = require('./../models/Connection.js')

const db = require('./../models/db.js');
const User_Mongo = db.userModel;
const UserProfile_Mongo = db.userprofileModel;
const UserConnection_Mongo = db.userconnectionModel;

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;

// const initUserProfile = function(user){ //initializes the user profile. The object is intantiated here and added to session.
//   var uc = [];
//   var up1 = new userProfile(user, uc);
//   return up1;
// }

const getUserProfileM = function(userEmail, callback){
  UserProfile_Mongo.findOne({'user.emailAddress': userEmail}, function(err, userProfileObj){
    if(err){
      console.log(err);
    }
    else{
      callback(userProfileObj);
    }
  });
}

const addUserConnectionM = function(up1, connection, rsvp){
  for(i=0; i<up1.userConnection.length;i++){
    if(up1.userConnection[i].connection._id.toString() == connection._id.toString()){
      console.log("Given connection already added");
      console.log("Updating rsvp");
      updateUserRsvpM(up1, connection, rsvp);
      return;
    }
  }
  console.log("Since connection hasn'rt been added we're adding it now");
  up1.userConnection.push(new userConnection(connection, rsvp));
  UserProfile_Mongo.findOneAndUpdate({'_id':up1._id}, {'userConnection':up1.userConnection}, function(err) {
    if (err) {
      console.log(err);
    }
    else{
      console.log("Done");
    }
  });
}


const updateUserRsvpM = function (up1, connection, rsvp){//updates the rsvp status
  for(i=0; i<up1.userConnection.length;i++){
    if(up1.userConnection[i].connection._id.toString() == connection._id.toString()){
      up1.userConnection[i].rsvp = rsvp;
    }
  }
  UserProfile_Mongo.findOneAndUpdate({'_id':up1._id}, {userConnection:up1.userConnection}, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully updated user RSVP");
    }
  })
  return up1;
}


function _arrayRemove(arr, value) {
	return arr.filter(function(ele){
    console.log(ele.connection._id);
		return ele.connection._id.toString() != value._id.toString();
	});
}

const removeUserConnectionM = function (up1, connection){ //used for deletion, when a user is no longer interested in attending a talk.
  var uc = _arrayRemove(up1.userConnection, connection);
  up1.userConnection = uc;
  UserProfile_Mongo.findOneAndUpdate({'_id':up1._id}, {userConnection:up1.userConnection}, function(err){
    if(err){
      console.log(err);
    }
    else{
      console.log("Successfully removed");
    }
  })
  return up1;
}


module.exports.addUserConnectionM = addUserConnectionM;
module.exports.removeUserConnectionM = removeUserConnectionM;
module.exports.updateUserRsvpM = updateUserRsvpM;
module.exports.getUserProfileM = getUserProfileM;
