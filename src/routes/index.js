const express = require("express");
const notificationRoutes = require("./notification.routes");

const router = express.Router();

router.use("/notifications", notificationRoutes);

module.exports = router;
