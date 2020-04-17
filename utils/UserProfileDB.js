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

// const addUserConnection = function (up1, connection, rsvp){ //used to add a new user connection
//   up1.userConnection.push(new userConnection(connection, rsvp));
//   return up1;
// }

const addUserConnectionM = function(up1, connection, rsvp){
  // console.log(connection);
  // console.log(rsvp);
  console.log(up1);
  up1.userConnection.push(new userConnection(connection, rsvp))
  console.log(up1);
  // var u = new UserProfile_Mongo(up1);
  // console.log(up1.userConnection[0]);

  var query = {'_id': up1._id};

  UserProfile_Mongo.findOneAndUpdate(query, up1.userConnection, {upsert: false}, function(err, doc) {
    if (err) {
      console.log(err);
    }
    else{
      console.log("Done");
    }
  });
}

  // var userConnectionObj = new UserConnection_Mongo(new userConnection(connection, rsvp));
  // userConnectionObj.save(function(err){
  //   if(err){
  //     console.log("Error while saving user connection: "+err);
  //     return;
  //   }
  //   callback();
  // });

const updateUserRsvp = function (up1, connection, rsvp){//updates the rsvp status
  for(i=0; i<up1._userConnection.length;i++){
    if(up1._userConnection[i]._connection._connectionID == connection._connectionID){
        up1._userConnection[i]._rsvp = rsvp;
    }
  }
  return up1;
}


function _arrayRemove(arr, value) {
	return arr.filter(function(ele){
    console.log(ele._connection._connectionID);
		return ele._connection._connectionID != value._connectionID;
	});
}

const removeUserConnection = function (up1, connection){ //used for deletion, when a user is no longer interested in attending a talk.
  var uc = _arrayRemove(up1._userConnection, connection);
  up1._userConnection = uc;
  return up1;
}


module.exports.addUserConnectionM = addUserConnectionM;
module.exports.removeUserConnection = removeUserConnection;
module.exports.updateUserRsvp = updateUserRsvp;
module.exports.getUserProfileM = getUserProfileM;
