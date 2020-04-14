var userDB = require('./../utils/UserDB.js')
var userProfileDB = require('./../utils/UserProfileDB.js')

exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = async (req, res) => {
    var user_email = req.body.user.email;
    // var usr = await userDB.getUserM(user_email);
    // var usr = userDB.getUser(user_email);
    // userProfileDB.initUserProfileM(usr);
    // req.session.theUser = up1;
    var up = await userProfileDB.getUserProfileM(user_email);
    console.log(up);
    res.render('savedConnections', {user: up});
}

exports.renderLogoutPage = (req,res) => {
  req.session.theUser = null;
  res.render('index', {user:req.session.theUser});
}
