const express = require("express")
const router = express.Router();
const homeController = require("./controllers/homeController");
const connectionController = require("./controllers/connectionController");

router.use(express.urlencoded()); //https://stackoverflow.com/questions/4295782/how-to-process-post-data-in-node-js
router.use(express.json());


router.get("/", homeController.renderHomePage);
router.get("/about", homeController.renderAboutPage);
router.get("/contact", homeController.renderContactPage);

router.get("/savedConnections", connectionController.renderSavedConnections);
router.get("/connections", connectionController.renderConnections);
router.get("/connection", connectionController.renderConnection);
router.get("/newConnection", connectionController.renderNewConnection);
router.post("/newConnection", connectionController.postRenderNewConnection);

module.exports = router;
