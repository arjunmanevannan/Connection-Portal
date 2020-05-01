const connectionDB = require('./../utils/ConnectionDB.js')
const Connection = require('./../models/Connection.js')
const UserProfileDB = require('./../utils/UserProfileDB.js')
const {validationResult} = require('express-validator');


exports.renderSavedConnections = (req,res) => { //renders all the saved connections from the "DB"
  UserProfileDB.getUserProfileM(req.session.theUser.user.emailAddress, function(userProfileObj){
    connectionDB.getConnectionsM(function(connections){
      var hostedConnections = [];
      for(var i=0; i<connections.length;i++){
        if(connections[i].host.emailAddress == req.session.theUser.user.emailAddress){
          hostedConnections.push(connections[i]);
        }
      }
      console.log(hostedConnections.length);
      res.render('savedConnections', {user: userProfileObj, conn:hostedConnections});
    })

  });
}

exports.renderConnections = (req, res) => {
  connectionDB.getConnectionsM(function(connections){
    res.render('connections', {obj:connections, user:req.session.theUser});
  })
}

exports.renderNewConnection = (req, res) => { //used for rendering new connections
  console.log(req.session.theUser);
  if(req.session.theUser == null){
    res.render('login', {user:req.session.theUser});
  }
  else{
    res.render('newConnection', {errors:null, user: req.session.theUser});
  }
}

exports.postRenderNewConnection = (req, res) => { //used to render new connection
  const result = validationResult(req);
  var errors = result.errors;

  var today = new Date();
  var convertedDate = new Date(req.body.connection.date);

  if(today > convertedDate){
    console.log("Invalid date");
    result.push('Date cannot be older than todas date');
  }

  if(!result.isEmpty()){
    console.log(errors);
    res.render('newConnection', {errors:errors, user:req.session.theUser});
  }
  else{
    var newConnection = new Connection(req.body.connection.name, req.session.theUser.user, req.body.connection.topic, req.body.connection.details, req.body.connection.date, req.body.connection.time);
    connectionDB.addConnectionM(newConnection, function(){
      connectionDB.getConnectionsM(function(connections){
        res.render('connections', {obj:connections, user:req.session.theUser});
      })
    })
  }
}

exports.renderConnection = (req, res) => { //rendering a new connection. The method checks the connection ID for a valid connection and returs it.
  if(typeof req.query.connectionID === 'undefined'){
    console.log("No connection ID given. Redirecting to connections");
    connectionDB.getConnectionsM(function(connections){
      res.render('connections', {obj:connections, user:req.session.theUser});
    });
  }
  else if(typeof req.query.connectionID !== 'undefined') {
    connectionDB.getConnectionM(req.query.connectionID, function(connection){
      if(connection!==null){
        res.render('connection', {obj:connection, user:req.session.theUser});
      }
      else{
        console.log("There is no talk hosted in the mentioned ID. Redirecting to all connections");
        var connections = connectionDB.getConnectionsM();
        res.render('connections', {obj:connections, user:req.session.theUser});
      }
    })
  }
}

exports.interestedConnection = (req, res) => {
  connectionDB.getConnectionM(req.query.connectionID, function(connection){
    if(connection!==null){
      UserProfileDB.getUserProfileM(req.session.theUser.user.emailAddress, function(userProfileObj){
        UserProfileDB.addUserConnectionM(userProfileObj, connection, req.query.rsvp,function(){
          res.redirect('/savedConnections',200, {user: req.session.theUser});
        });
      });
    }
  });
}

// exports.updateRSVP = (req, res) => { //updates the rsvp status for added connections
//   connectionDB.getConnectionM(req.query.connectionID, function(connection){
//     if(connection!==null){
//       UserProfileDB.getUserProfileM(req.session.theUser.user.emailAddress, function(userProfileObj){
//         UserProfileDB.updateUserRsvpM(userProfileObj, connection, req.query.rsvp);//check with addUserConnectionM
//         res.redirect('/savedConnections',200, {user: req.session.theUser});
//       });
//     }
//   });
// }

exports.removeUserConnection = (req, res) => { // helps the user remove the connection from his dashboard.
  connectionDB.getConnectionM(req.query.connectionID, function(connection){
    if(connection){
      UserProfileDB.getUserProfileM(req.session.theUser.user.emailAddress, function(userProfileObj){
        if(userProfileObj){
          UserProfileDB.removeUserConnectionM(userProfileObj, connection, function(up1){
            req.session.theUser = up1;
            res.redirect('/savedConnections', 200, {user: req.session.theUser});
          });
        }
      })
    }
  });
}

exports.deleteConnection = (req, res) => { // allows the owner to delete the connection from the website.
  var id = req.query.connectionID;
  connectionDB.deleteConnectionM(id, function(){
    res.redirect('/connections', 200, {user:req.session.theUser});
  });
}
