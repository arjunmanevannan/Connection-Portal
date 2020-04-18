const Connection = require('./../models/Connection.js');
const UserDB = require('./UserDB.js');
const UserProfileDB = require('./UserProfileDB.js');
const db = require('./../models/db.js');
const Connection_Mongo = db.connectionModel;
const UserProfile_Mongo = db.userprofileModel;
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/TechMasters');
let conn = mongoose.connection;

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
  UserProfile_Mongo.find({}, function(err, result){
    getConnectionM(connectionID, function(connection){
      console.log("The connection to be deleted: "+connection);
      for(var i=0; i<result.length;i++){
        UserProfileDB.removeUserConnectionM(result[i], connection, function(){
          console.log("Connection has been processed");
        });
      }
      Connection_Mongo.findOneAndRemove({_id:connectionID}, function(err){
        if(err){
          console.log("Error deleting the record: "+err);
          return;
        }
        callback();
      })
    });
  });
}


module.exports.getConnectionM = getConnectionM;
module.exports.getConnectionsM = getConnectionsM;
module.exports.deleteConnectionM = deleteConnectionM;
module.exports.addConnectionM = addConnectionM;
