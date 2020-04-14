const User = require('./../models/User.js')
const UserDB = require('./../utils/UserDB.js')
const mongoose = require('mongoose');
const User_Mongo = require('./../models/user.model.js')

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

// exports.renderPostNewUserPage = (req, res) => {
//   var newUser = new User(req.body.user.emailAddress+Math.random(), req.body.user.firstName, req.body.user.lastName, req.body.user.emailAddress, req.body.user.addressLine1, req.body.user.addressLine2, req.body.user.city, req.body.user.state, req.body.user.zip, req.body.user.country);
//   UserDB.addUser(newUser);
//   var users = UserDB.getUsers();
//   console.log(users.length);
//   res.redirect('/', 200, {user: req.session.theUser});
// }

exports.renderPostNewUserPage = (req, res) => {
  var user =  new User_Mongo();
  user.isHost = false;
  user.userID = req.body.user.emailAddress+Math.random();
  user.firstName = req.body.user.firstName;
  user.lastName = req.body.user.lastName;
  user.emailAddress = req.body.user.emailAddress;
  user.addressLine1 = req.body.user.addressLine1;
  user.addressLine2 = req.body.user.addressLine2;
  user.city = req.body.user.city;
  user.state = req.body.user.state;
  user.zip = req.body.user.zip;
  user.country = req.body.user.country;

  user.save((err, doc) => {
    if(!err){
      res.redirect('/', 200, {user: req.session.theUser});
    }
    else{
      console.log("Error inserting record: "+err);
    }
  });
}
