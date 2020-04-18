const express = require("express")
const connectionRouter = express.Router();
const connectionController = require("./controllers/connectionController");

connectionRouter.get("/interested", connectionController.interestedConnection);
// connectionRouter.get("/updatersvp", connectionController.updateRSVP);
connectionRouter.get("/delete", connectionController.removeUserConnection);
connectionRouter.get("/deleteConnection", connectionController.deleteConnection);
module.exports = connectionRouter;
