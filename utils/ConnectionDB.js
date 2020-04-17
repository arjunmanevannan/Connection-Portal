const Connection = require('./../models/Connection.js')
const UserDB = require('./UserDB.js');
const db = require('./../models/db.js');
const Connection_Mongo = db.connectionModel;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;


// var users = UserDB.getUsers(); // gets all the users to be passed as an argument for the connection constructor.
//
// var con1 = new Connection('Gestures',users[0],'Android','Test', '12-07-2019', '04:12');
// var con2 = new Connection('New in Android 10!',users[0],'Android','Test', '12-07-2019', '05:12');
// var con3 = new Connection('Collections',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
// var con4 = new Connection('New in Java 12',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
// var con5 = new Connection('Advanced',users[0],'Introduction to JAVA', 'Test', '12-07-2019', '06:12');
// var con6 = new Connection('Resume Building',users[0],'Career', 'Test', '12-07-2019', '06:12');
// var con7 = new Connection('How to tackle the Phone/Skype Interview!',users[0],'Career','Test', '12-07-2019', '06:12');
// var con8 = new Connection('Importance of Grooming',users[0],'Career','Test', '12-07-2019', '06:12');
//
// var connections = [con1,con2,con3,con4,con5,con6,con7,con8];

const getConnectionsM = function(callback){
  Connection_Mongo.find({}, function(err, result){
    connectionsList = result;
    callback(result);
  });
}

const addConnectionM = function(connection, callback){
  var connectionObj = new Connection_Mongo(connection);
  connectionObj.save(function(err){
    if(err){
      console.log("Error while creating new user: "+err);
      return;
    }
    callback();
  });
}

const getConnectionM = function(connectionID, callback){
  Connection_Mongo.findOne({_id:connectionID}, function(err, result){
    callback(result);
  });
}

const deleteConnectionM = function(connectionID, callback){
  Connection_Mongo.findOneAndRemove({_id:connectionID}, function(err){
    if(err){
      console.log("Error deleting the record: "+err);
    }
    callback();
  })
}


module.exports.getConnectionM = getConnectionM;
module.exports.getConnectionsM = getConnectionsM;
module.exports.deleteConnectionM = deleteConnectionM;
module.exports.addConnectionM = addConnectionM;
