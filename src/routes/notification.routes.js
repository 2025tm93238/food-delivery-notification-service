const express = require("express");
const validate = require("../middleware/validate");
const { sendNotification } = require("../validators/notification.validator");
const ctrl = require("../controllers/notification.controller");

const router = express.Router();

router.post("/", validate(sendNotification), ctrl.send);
router.get("/", ctrl.list);
router.get("/:id", ctrl.getById);
router.delete("/:id", ctrl.remove);

module.exports = router;
