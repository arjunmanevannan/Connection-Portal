var up1 = require('./../utils/UserProfileDB.js')

exports.renderLoginPage = (req,res) => {
  res.render('login');
}

exports.postRenderLoginPage = (req, res) => {
    var user_email = req.body.user.email;
    console.log(user_email); //search for the user profile with the email address
    req.session.theUser = up1;

    console.log(up1);
    res.render('savedConnections', {user: req.session.theUser});

}

exports.renderLogoutPage = (req,res) => {
  console.log("Before");
  console.log(req.session.theUser);
  req.session.theUser = null;
  console.log("After");
  console.log(req.session.theUser);
  console.log("Done");
  res.render('index', {user:req.session.theUser});

    // req.session.destroy((err) => {
    //
    // })// will always fire after session is destroyed
  // res.render('index');
}
