const express = require("express")
const session = require("express-session");
const router = express.Router();
const homeController = require("./controllers/homeController");
const connectionController = require("./controllers/connectionController");
const userController = require("./controllers/userController");

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


router.get("/savedConnections", connectionController.renderSavedConnections);
router.get("/connections", connectionController.renderConnections);
router.get("/connection", connectionController.renderConnection);
router.get("/newConnection", connectionController.renderNewConnection);
router.post("/newConnection", connectionController.postRenderNewConnection);

router.get("/login", userController.renderLoginPage);
router.post("/login", userController.postRenderLoginPage);
router.get("/logout", userController.renderLogoutPage);

module.exports = router;
