const user = require('./../models/User.js')
const userProfile = require('./../models/UserProfile.js')
const db = require('./../models/db.js');
const User_Mongo = db.userModel;
const UserProfile_Mongo = db.userprofileModel;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;

const addUserM = function(user, callback){
  User_Mongo.findOne({emailAddress: user.emailAddress}, function(err, userObj){
    if(err){
      console.log(err);
    }
    else if(userObj){
      console.log("Object exists. Can't create a user");
    }
    else{
      var userObj = new User_Mongo(user);
      userObj.save(function(err){
        if(err){
          console.log("Error while creating new user: "+err);
          return;
        }
        callback(userObj);
      });
    }
  })
}

const initUserProfileM = function(userObj){
  var userConnectionObj = [];
  var up1 = new UserProfile_Mongo(new userProfile(userObj, userConnectionObj));
  up1.save(function(err){
    if(err){
      console.log("Error saving user profile for the user "+user.firstName+" :"+err);
    }
  })
}

const getUserM = async function(userEmail, callback){
  var loggedInUser = "";
  await User_Mongo.findOne({emailAddress: userEmail}, function(err, userObj){
    if(err){
      console.log(err);
    }else{
      loggedInUser = userObj;
      callback(loggedInUser);
    }
  });
}

module.exports.initUserProfileM = initUserProfileM;
module.exports.addUserM = addUserM;
module.exports.getUserM = getUserM;
