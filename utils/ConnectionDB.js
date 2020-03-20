const Connection = require('./../models/Connection.js')
var con1 = new Connection('1111','Gestures','Arjun Manevannan','Android','Test', '12-07-2019', '04:12');
var con2 = new Connection('1112','New in Android 10!','Arjun Manevannan','Android','Test', '12-07-2019', '05:12');
var con3 = new Connection('1113','Collections','Arjun Manevannan','Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con4 = new Connection('1114','New in Java 12','Arjun Manevannan','Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con5 = new Connection('1115','Advanced','Arjun Manevannan','Introduction to JAVA', 'Test', '12-07-2019', '06:12');
var con6 = new Connection('1116','Resume Building','Arjun Manevannan','Career', 'Test', '12-07-2019', '06:12');
var con7 = new Connection('1117','How to tackle the Phone/Skype Interview!','Arjun Manevannan','Career','Test', '12-07-2019', '06:12');
var con8 = new Connection('1118','Importance of Grooming','Arjun Manevannan','Career','Test', '12-07-2019', '06:12');

var connections = [con1,con2,con3,con4,con5,con6,con7,con8];

const getConnections = function(){
  return connections;
}

const addConnection = function(connection){
  connections.push(connection);
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


module.exports.addConnection = addConnection;
module.exports.getConnection = getConnection;
module.exports.getConnections = getConnections;
