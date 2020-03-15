const connectionDB = require('./../utils/ConnectionDB.js')
const Connection = require('./../models/Connection.js')


exports.renderSavedConnections = (req,res) => {
  res.render('savedConnections');
}

exports.renderConnections = (req, res) => {
  let connections = connectionDB.getConnections();
  res.render('connections', {obj:connections});
}

exports.renderNewConnection = (req, res) => {
  res.render('newConnection');
}

exports.renderConnection = (req, res) => {
  console.log(req.query.connectionID);
  if(typeof req.query.connectionID === 'undefined'){
    console.log("No connection ID given. Redirecting to connections");
    var connections = connectionDB.getConnections();
    res.render('connections', {obj:connections});
  }
  else if(typeof req.query.connectionID !== 'undefined') {
    var connection = connectionDB.getConnection(req.query.connectionID);
    if(connection!==null){
      res.render('connection', {obj:connection});
    }
    else{
      console.log("There is no talk hosted in the mentioned ID. Redirecting to all connections");
      var connections = connectionDB.getConnections();
      res.render('connections', {obj:connections});
    }
  }
}

exports.postRenderNewConnection = (req, res) => {
  var newConnection = new Connection(req.body.connection.topic+Math.random(), req.body.connection.name, req.body.connection.host, req.body.connection.topic, req.body.connection.details, req.body.connection.date, req.body.connection.time);
  console.log(newConnection);
  connectionDB.addConnection(newConnection);
  var connections = connectionDB.getConnections();
  console.log(connections.length);
  res.render('connections', {obj:connections});
}
