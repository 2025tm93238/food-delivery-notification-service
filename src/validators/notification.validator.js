const Joi = require("joi");

const TYPES = [
  "ORDER_PLACED",
  "ORDER_CONFIRMED",
  "ORDER_PICKED_UP",
  "ORDER_DELIVERED",
  "PAYMENT_SUCCESS",
  "PAYMENT_FAILED",
];
const CHANNELS = ["EMAIL", "SMS", "PUSH"];

const sendNotification = Joi.object({
  userId: Joi.string().trim().required(),
  type: Joi.string().valid(...TYPES).required(),
  channel: Joi.string().valid(...CHANNELS).required(),
  message: Joi.string().trim().min(1).max(500).required(),
  metadata: Joi.object().default({}),
});

module.exports = { sendNotification };
