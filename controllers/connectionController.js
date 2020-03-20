const connectionDB = require('./../utils/ConnectionDB.js')
const Connection = require('./../models/Connection.js')


exports.renderSavedConnections = (req,res) => {
  res.render('savedConnections');
}

exports.renderConnections = (req, res) => {
  let connections = connectionDB.getConnections();
  res.render('connections', {obj:connections, user:req.session.theUser});
}

exports.renderNewConnection = (req, res) => {
  if(req.session.theUser == null){
    res.render('login', {user:req.session.theUser});
  }
  else{
    res.render('newConnection', {user: req.session.theUser});
  }
}

exports.renderConnection = (req, res) => {
  console.log(req.query.connectionID);
  if(typeof req.query.connectionID === 'undefined'){
    console.log("No connection ID given. Redirecting to connections");
    var connections = connectionDB.getConnections();
    res.render('connections', {obj:connections, user:req.session.theUser});
  }
  else if(typeof req.query.connectionID !== 'undefined') {
    console.log("RAMASAMY");
    var connection = connectionDB.getConnection(req.query.connectionID);
    if(connection!==null){
      res.render('connection', {obj:connection, user:req.session.theUser});
    }
    else{
      console.log("There is no talk hosted in the mentioned ID. Redirecting to all connections");
      var connections = connectionDB.getConnections();
      res.render('connections', {obj:connections, user:req.session.theUser});
    }
  }
}

exports.postRenderNewConnection = (req, res) => {
  var newConnection = new Connection(req.body.connection.topic+Math.random(), req.body.connection.name, req.body.connection.host, req.body.connection.topic, req.body.connection.details, req.body.connection.date, req.body.connection.time);
  console.log(newConnection);
  connectionDB.addConnection(newConnection);
  var connections = connectionDB.getConnections();
  console.log(connections.length);
  res.render('connections', {obj:connections, user:req.session.theUser});
}
