var userDB = require('./../utils/UserDB.js')
var userProfileDB = require('./../utils/UserProfileDB.js')

exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = async (req, res) => {
    var user_email = req.body.user.email;
    var usr = await userDB.getUserM(user_email);
    if(!usr){
      res.render('login');
    }
    else{
      var up1 = await userProfileDB.getUserProfileM(user_email);
      req.session.theUser = up1;
      res.render('savedConnections', {user: req.session.theUser});
    }
}

exports.renderLogoutPage = (req,res) => {
  req.session.theUser = null;
  res.render('index', {user:req.session.theUser});
}
