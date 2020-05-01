var userDB = require('./../utils/UserDB.js')
var userProfileDB = require('./../utils/UserProfileDB.js')
const {validationResult} = require('express-validator');

exports.renderLoginPage = (req,res) => {
  res.render('login', {errors: null, e:null});
}

exports.postRenderLoginPage = (req, res) => {
  const result = validationResult(req);
  var errors = result.errors;
  if(!result.isEmpty()){
    res.render('login', {errors: errors, e:null});
  }
  else{
    var user_email = req.body.user.email;
    var user_pwd = req.body.user.password;
    userDB.getUserM(user_email, function(usr){
      if(!usr){
        console.log("No user found in the DB. Please sign up");
        var e = ["No user found in the DB. Please sign up"];
        res.render('login', {errors:null, e:e});
        return;
      } else if(usr.password === user_pwd){
        console.log(usr);
        userProfileDB.getUserProfileM(user_email, function(userProfileObj){
          req.session.theUser = userProfileObj;
          res.redirect('/savedConnections', 200, {user: req.session.theUser});
        });
      } else if(usr.password !== user_pwd){
        var e = ["Incorrect Password"];
        res.render('login', {errors:null, e:e});
        console.log("Incorrect Password");
      }
    })
  }
}

exports.renderLogoutPage = (req,res) => {
  req.session.theUser = null;
  res.render('index', {user:req.session.theUser});
}
