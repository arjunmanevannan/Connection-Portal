var up1 = require('./../utils/UserProfileDB.js')
var userDB = require('./../utils/UserDB.js')

exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = (req, res) => {
    var user_email = req.body.user.email;

    console.log(user_email); //search for the user profile with the email address
    var usr = userDB.getUser(user_email);
    console.log("FGFGFG "+usr._firstName);
    req.session.theUser = up1;
    console.log(up1);
    res.render('savedConnections', {user: req.session.theUser});

}

exports.renderLogoutPage = (req,res) => {
  console.log(req.session.theUser);
  req.session.theUser = null;
  res.render('index', {user:req.session.theUser});
}
