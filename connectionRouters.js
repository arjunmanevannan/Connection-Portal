const express = require("express")
const connectionRouter = express.Router();
const connectionController = require("./controllers/connectionController");



connectionRouter.get("/interested", connectionController.interestedConnection);
connectionRouter.get("/updatersvp", connectionController.updateRSVP);

module.exports = connectionRouter;
