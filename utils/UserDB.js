const user = require('./../models/User.js')

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

const getUser = function(userEmail){
  var users = getUsers();
  for(var i=0; i<users.length; i++){
    if(users[i]._emailAddress == userEmail){
      var loggedInUser = users[i];
      console.log("Logged In. "+ loggedInUser._firstName);
    }
  }
  return loggedInUser;
}


module.exports.getUsers = getUsers;
module.exports.getUser = getUser;
module.exports.addUser = addUser;
