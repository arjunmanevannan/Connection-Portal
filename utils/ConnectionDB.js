const Connection = require('./../models/Connection.js')
const UserDB = require('./UserDB.js');

const Connection_Mongo = require('./../models/connection.model.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;


var users = UserDB.getUsers(); // gets all the users to be passed as an argument for the connection constructor.

var con1 = new Connection('Gestures',users[0],'Android','Test', '12-07-2019', '04:12');
var con2 = new Connection('New in Android 10!',users[0],'Android','Test', '12-07-2019', '05:12');
var con3 = new Connection('Collections',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con4 = new Connection('New in Java 12',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con5 = new Connection('Advanced',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con6 = new Connection('Resume Building',users[0],'Career', 'Test', '12-07-2019', '06:12');
var con7 = new Connection('How to tackle the Phone/Skype Interview!',users[0],'Career','Test', '12-07-2019', '06:12');
var con8 = new Connection('Importance of Grooming',users[0],'Career','Test', '12-07-2019', '06:12');

var connections = [con1,con2,con3,con4,con5,con6,con7,con8];

const getConnections = function(){
  return connections;
}
const getConnectionsM = function(){
  var connectionsList;
  Connection_Mongo.find({}, function(err, result){
    if(err){
      console.log("Error while retrieving connection objects: "+err);
    }
    else{
      connectionsList = result;
    }
  })
  console.log("OOPS "+connectionsList);
  return connectionsList;
}
const setConnections = function(newConnections){
  connections = newConnections;
}
const addConnection = function(connection){
  console.log(connection);
  connections.push(connection);
}

const addConnectionM = function(connection){
  var connectionObj = new Connection_Mongo(connection);
  connectionObj.save(function(err){
    if(err){
      console.log("Error while creating new user: "+err);
    }
  });
}

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
module.exports.getConnectionsM = getConnectionsM;
module.exports.getConnections = getConnections;
module.exports.deleteConnection = deleteConnection;
module.exports.addConnectionM = addConnectionM;
