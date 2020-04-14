const Connection = require('./../models/Connection.js')
const UserDB = require('./UserDB.js');

const Connection_Mongo = require('./../models/connection.model.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;


var users = UserDB.getUsers(); // gets all the users to be passed as an argument for the connection constructor.

var con1 = new Connection('1111','Gestures',users[0],'Android','Test', '12-07-2019', '04:12');
var con2 = new Connection('1112','New in Android 10!',users[0],'Android','Test', '12-07-2019', '05:12');
var con3 = new Connection('1113','Collections',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con4 = new Connection('1114','New in Java 12',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con5 = new Connection('1115','Advanced',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con6 = new Connection('1116','Resume Building',users[0],'Career', 'Test', '12-07-2019', '06:12');
var con7 = new Connection('1117','How to tackle the Phone/Skype Interview!',users[0],'Career','Test', '12-07-2019', '06:12');
var con8 = new Connection('1118','Importance of Grooming',users[0],'Career','Test', '12-07-2019', '06:12');

var connections = [con1,con2,con3,con4,con5,con6,con7,con8];

const getConnections = function(){
  return connections;
}
const setConnections = function(newConnections){
  connections = newConnections;
}
const addConnection = function(connection){
  console.log(connection);
  connections.push(connection);
}

// const addConnectionM = function(connection){
//   var newConnection = new Connection_Mongo();
//   newConnection.name = l;
//   newConnection.host = l;
//   newConnection.topic = l;
//   newConnection.details = l;
//   newConnection.date = l;
//   newConnection.time = l;
//
// }




// const initUserProfileM = function(user){
//   var up1 = new UserProfile_Mongo();
//   up1.user = user;
//   conn.db.collection("userProfiles").insert(up1);
// }

const getConnection = function (givenConnectionID){
  for(var i=0;i<connections.length;i++){
    if(connections[i]._connectionID == givenConnectionID){
      return connections[i];
      break;
    }
  }
  return null;
}

function _arrayRemove(arr, value) {
	return arr.filter(function(ele){
    console.log(ele._connectionID);
		return ele._connectionID != value;
	});
}

const deleteConnection = function(id) {
  var connections = getConnections();
  var newConnectionsList = _arrayRemove(connections, id);
  setConnections(newConnectionsList);
}


module.exports.addConnection = addConnection;
module.exports.getConnection = getConnection;
module.exports.getConnections = getConnections;
module.exports.deleteConnection = deleteConnection;
