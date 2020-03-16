exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = (req, res) => {
  var newUserProfile = new 

  var newConnection = new Connection(req.body.connection.topic+Math.random(), req.body.connection.name, req.body.connection.host, req.body.connection.topic, req.body.connection.details, req.body.connection.date, req.body.connection.time);
  console.log(newConnection);
  connectionDB.addConnection(newConnection);
  var connections = connectionDB.getConnections();
  console.log(connections.length);
  res.render('connections', {obj:connections});
}
