const connectionDB = require('./../utils/ConnectionDB.js')
const Connection = require('./../models/Connection.js')
const UserProfileDB = require('./../utils/UserProfileDB.js')


exports.renderSavedConnections = (req,res) => { //renders all the saved connections from the "DB"
  var connections = req.session.theUser._userConnection;
  const uniqueConnections = Array.from(new Set(connections.map(c => c._connection._connectionID)))
  .map(id => {
    return connections.find(c => c._connection._connectionID === id)
  })

  req.session.theUser._userConnection = uniqueConnections;
  res.render('savedConnections', {user:req.session.theUser});
}

exports.renderConnections = (req, res) => {
  let connections = connectionDB.getConnections();
  res.render('connections', {obj:connections, user:req.session.theUser});
}

exports.renderNewConnection = (req, res) => { //used for rendering new connections
  console.log(req.session.theUser);
  if(req.session.theUser == null){
    res.render('login', {user:req.session.theUser});
  }
  else{
    res.render('newConnection', {user: req.session.theUser});
  }
}

exports.postRenderNewConnection = (req, res) => { //used to render new connection
  //
  // connectionDB.addConnectionM(newConnection);
  // connectionDB.getConnectionsM(function(connections){
  //   res.render('connections', {obj:connections, user:req.session.theUser});
  // })

  var newConnection = new Connection(req.body.connection.name, req.session.theUser.user, req.body.connection.topic, req.body.connection.details, req.body.connection.date, req.body.connection.time);
  connectionDB.addConnectionM(newConnection, function(){
    connectionDB.getConnectionsM(function(connections){
      res.render('connections', {obj:connections, user:req.session.theUser});
    })
  })
}

exports.renderConnection = (req, res) => { //rendering a new connection. The method checks the connection ID for a valid connection and returs it.
  if(typeof req.query.connectionID === 'undefined'){
    console.log("No connection ID given. Redirecting to connections");
    var connections = connectionDB.getConnections();
    res.render('connections', {obj:connections, user:req.session.theUser});
  }
  else if(typeof req.query.connectionID !== 'undefined') {
    var connection = connectionDB.getConnection(req.query.connectionID);
    if(connection!==null){
      // console.log(req.session.theUser._user._userID);
      res.render('connection', {obj:connection, user:req.session.theUser});
    }
    else{
      console.log("There is no talk hosted in the mentioned ID. Redirecting to all connections");
      var connections = connectionDB.getConnections();
      res.render('connections', {obj:connections, user:req.session.theUser});
    }
  }
}

exports.interestedConnection = (req, res) => { //adds the connection to user profile.
  var connection = connectionDB.getConnection(req.query.connectionID);
  UserProfileDB.addUserConnection(req.session.theUser, connection, "Yes");
  res.redirect('/savedConnections',200, {user: req.session.theUser});
}

exports.updateRSVP = (req, res) => { //updates the rsvp status for added connections
  var connection = connectionDB.getConnection(req.query.connectionID);
  UserProfileDB.updateUserRsvp(req.session.theUser, connection, req.query.rsvp);
  res.redirect('/savedConnections',200, {user: req.session.theUser});
}

exports.removeUserConnection = (req, res) => { // helps the user remove the connection from his dashboard.
  var connection = connectionDB.getConnection(req.query.connectionID);
  UserProfileDB.removeUserConnection(req.session.theUser, connection)
  res.redirect('/savedConnections',200, {user: req.session.theUser});
}

exports.deleteConnection = (req, res) => { // allows the owner to delete the connection from the website.
  var id = req.query.connectionID;
  connectionDB.deleteConnection(id);
  res.redirect('/savedConnections', 200, {user:req.session.theUser});
}
