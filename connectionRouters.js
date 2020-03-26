const express = require("express")
const connectionRouter = express.Router();
const connectionController = require("./controllers/connectionController");



connectionRouter.get("/yes", connectionController.renderYesPage);
connectionRouter.get("/no", connectionController.renderNoPage);

module.exports = connectionRouter;
