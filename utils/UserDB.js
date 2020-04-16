const user = require('./../models/User.js')
const userProfile = require('./../models/UserProfile.js')
const User_Mongo = require('./../models/user.model.js');
const UserProfile_Mongo = require('./../models/userProfile.model.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;

var usr1 = new user('2111','Arjun','Manevannan','arjun@gmail.com');
var usr2 = new user('2112','John','Doe','john@gmail.com');
var usr3 = new user('2113','Bill','S','bill@gmail.com');
var usr4 = new user('2114','Jack','Ma','jack@gmail.com');

var users = [usr1, usr2, usr3, usr4];

const getUsers = function(){
  return users;
}

const addUser = function(user){
  users.push(user);
}

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

const getUserM = async function(userEmail){
  var loggedInUser = "";
  await User_Mongo.findOne({emailAddress: userEmail}, function(err, userObj){
    if(err){
      console.log(err);
    }else{
      loggedInUser = userObj;
    }
  });
  return loggedInUser;
}

module.exports.initUserProfileM = initUserProfileM;
module.exports.getUsers = getUsers;
module.exports.addUser = addUser;
module.exports.addUserM = addUserM;
module.exports.getUserM = getUserM;
