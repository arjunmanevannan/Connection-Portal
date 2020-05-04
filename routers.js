const express = require("express")
const session = require("express-session");
const router = express.Router();
const UserDB = require('./utils/UserDB.js');
const homeController = require("./controllers/homeController");
const connectionController = require("./controllers/connectionController");
const userController = require("./controllers/userController");
const {check} = require('express-validator');
const {body} = require('express-validator');

router.use(express.urlencoded()); //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
router.use(express.json());
router.use(session({
  name: 'server',
  secret:'test',
  saveUninitialized: false,
  resave: false
}));

router.get("/", homeController.renderHomePage);
router.get("/about", homeController.renderAboutPage);
router.get("/contact", homeController.renderContactPage);
router.get("/newUser", homeController.renderNewUserPage);
router.post("/newUser", [
  check('user[firstName]')
  .not().isEmpty().withMessage('First name cannot be empty')
  .isLength({
    min: 2
  }).withMessage('First name has to be at least 2 characters'),
  check('user[lastName]').not().isEmpty().withMessage('Last name cannot be empty')
  .isLength({
    min: 2
  }).withMessage('Last name has to be at least 2 characters long'),
  check('user[emailAddress]').not().isEmpty().withMessage('The email address cannot be empty')
  .isEmail().withMessage('Not a valid email address'),
  check('user[emailAddress]').custom(async val => {
    var value = true;
    await UserDB.getUserM(val, function(user){
      if(user){
        console.log("FALSE "+user);
        console.log("FALSE");
        value = false;
      }
      else{
        console.log("TRUE "+user);
        console.log("TRUE");
      }
    });

    console.log("value - "+ value)

    if(value){
      return true;
    }else{
      return Promise.reject('Email already in use')
    }
  }),
  check('user[password]')
  .isLength({
    min: 4
  }).withMessage('Password must be at least 4 characters long'),
  body('user[city]').optional().trim().escape(),
  body('user[state]').optional().trim().escape(),
  check('user[zip]').optional().isPostalCode('US').withMessage('Not a valid Postal Code'),
  body('user[country]').optional().trim().escape(),
], homeController.renderPostNewUserPage);

router.get("/savedConnections", connectionController.renderSavedConnections);
router.get("/connections", connectionController.renderConnections);
router.get("/connection", connectionController.renderConnection);
router.get("/newConnection", connectionController.renderNewConnection);
router.post("/newConnection", [
  check('connection[name]')
  .not().isEmpty().withMessage('The name cannot be empty')
  .isLength({
    min: 3
  }).withMessage('Name has to be at least 3 characters'),
  check('connection[topic]')
  .not().isEmpty().withMessage('The topic cannot be empty'),
  check('connection[date]')
  .not().isEmpty().withMessage('The date cannot be empty'),
  check('connection[time]')
  .not().isEmpty().withMessage('The time cannot be empty'),
  body('connection[date]', 'Date cannot be past')
  .custom(val => {
    var today = new Date();
    var convertedDate = new Date(val);
    if(today > convertedDate){
      return false;
    }
    return true;
  })
], connectionController.postRenderNewConnection);

router.get("/login", userController.renderLoginPage);
router.post("/login", [
  check('user[email]')
  .not().isEmpty().withMessage('The user name field cannot be empty')
  .isEmail().withMessage('Not a valid email address'),
  body('user[email]', 'User account no exist. Please sign up')
  .custom(val => {
    UserDB.getUserM(val, function(user){
      if(user){
        console.log(user);
        return false;
      }
      return true;
    });
  }),
  check('user[password]')
  .not().isEmpty().withMessage('The password field should not be empty'),

], userController.postRenderLoginPage);
router.get("/logout", userController.renderLogoutPage);

module.exports = router;
