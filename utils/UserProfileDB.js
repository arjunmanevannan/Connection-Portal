const user = require('./../models/User.js')
const userConnection = require('./../models/UserConnection.js')
const userProfile = require('./../models/UserProfile.js')
const connection = require('./../models/Connection.js')

const initUserProfile = function (user){
  var uc = [];
  var up1 = new userProfile(user, uc);
  return up1;
}

const addUserConnection = function (up1, connection, rsvp){
  up1._userConnection.push(new userConnection(connection, rsvp));
  // for(i=0; i<up1._userConnection.length;i++){
  //   console.log(up1._userConnection[i]);
  // }
  return up1;
}

const updateUserRsvp = function (up1, connection, rsvp){
  // console.log(up1._userConnection[0]._connection._connectionID);
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

// var result = arrayRemove(array, 6);// result = [1, 2, 3, 4, 5, 7, 8, 9, 0]

const removeUserConnection = function (up1, connection, rsvp){
  var uc = _arrayRemove(up1._userConnection, connection);
  up1._userConnection = uc;
  return up1;
}


module.exports.initUserProfile = initUserProfile;
module.exports.addUserConnection = addUserConnection;
module.exports.removeUserConnection = removeUserConnection;
module.exports.updateUserRsvp = updateUserRsvp;
