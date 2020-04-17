var userDB = require('./../utils/UserDB.js')
var userProfileDB = require('./../utils/UserProfileDB.js')

exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = async (req, res) => {
  var user_email = req.body.user.email;
  var usr = await userDB.getUserM(user_email);
  if(!usr){
    console.log("No user found in the DB. Please sign up");
    res.render('login');
    return;
  }
  userProfileDB.getUserProfileM(user_email, function(userProfileObj){
    console.log("This is why I failed: "+userProfileObj);
    req.session.theUser = userProfileObj;
    res.render('savedConnections', {user: req.session.theUser});
  });
}

exports.renderLogoutPage = (req,res) => {
  req.session.theUser = null;
  res.render('index', {user:req.session.theUser});
}
