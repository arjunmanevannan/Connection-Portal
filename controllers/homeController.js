var up1 = require('./../utils/UserProfileDB.js') //debug. Need to be removed.
exports.renderAboutPage = (req, res) => {
  console.log(up1); //debug. Need to be removed.
  res.render("about", {user:req.session.theUser});
}

exports.renderHomePage = (req,res) => {
  res.render('index', {user:req.session.theUser});
}

exports.renderContactPage = (req,res) => {
  res.render('contact', {user:req.session.theUser});
}
