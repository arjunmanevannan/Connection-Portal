const User = require('./../models/User.js')
const UserDB = require('./../utils/UserDB.js')
const {validationResult} = require('express-validator');

exports.renderAboutPage = (req, res) => {
  res.render("about", {user:req.session.theUser});
}

exports.renderHomePage = (req,res) => {
  res.render('index', {user:req.session.theUser});
}

exports.renderContactPage = (req,res) => {
  res.render('contact', {user:req.session.theUser});
}

exports.renderNewUserPage = (req,res) => {
  res.render('newUser', {errors: null});
}

exports.renderPostNewUserPage = (req, res) => {
  const result = validationResult(req);
  var errors = result.errors;
  console.log(result);

  if(!result.isEmpty()){
    res.render('newUser', {errors: errors});
  }
  else{
    var newUser = new User(req.body.user.firstName, req.body.user.lastName, req.body.user.emailAddress, req.body.user.password, req.body.user.addressLine1, req.body.user.addressLine2, req.body.user.city, req.body.user.state, req.body.user.zip, req.body.user.country);
    UserDB.addUserM(newUser, function(newUser){
      if(newUser === null){
        var e = ["User already present. Please log in"];
        res.render('login', {errors:null, e:e});
      }
      else{
        UserDB.initUserProfileM(newUser);
        res.redirect('/', 200, {user: req.session.theUser});
      }
    });
  }
}
