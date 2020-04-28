const User = require('./../models/User.js')
const UserDB = require('./../utils/UserDB.js')

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
  res.render('newUser');
}

exports.renderPostNewUserPage = (req, res) => {
  var newUser = new User(req.body.user.firstName, req.body.user.lastName, req.body.user.emailAddress, req.body.user.password, req.body.user.addressLine1, req.body.user.addressLine2, req.body.user.city, req.body.user.state, req.body.user.zip, req.body.user.country);
  
  UserDB.addUserM(newUser, function(newUser){
    UserDB.initUserProfileM(newUser);
  });
  res.redirect('/', 200, {user: req.session.theUser});
}
