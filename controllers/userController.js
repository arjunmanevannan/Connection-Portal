var up1 = require('./../utils/UserProfileDB.js')
var userDB = require('./../utils/UserDB.js')
var userProfileDB = require('./../utils/UserProfileDB.js')

exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = (req, res) => {
    var user_email = req.body.user.email;
    var usr = userDB.getUser(user_email);
    var up1 = userProfileDB.initUserProfile(usr);
    req.session.theUser = up1;
    res.render('savedConnections', {user: req.session.theUser});
}

exports.renderLogoutPage = (req,res) => {
  req.session.theUser = null;
  res.render('index', {user:req.session.theUser});
}
