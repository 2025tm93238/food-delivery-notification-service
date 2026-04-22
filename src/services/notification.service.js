const Notification = require("../models/Notification");
const { errors } = require("../utils/errors");
const { logger } = require("../middleware/logger");

const mockSend = (doc) => {
  logger.info("mock_send", {
    channel: doc.channel,
    type: doc.type,
    userId: doc.userId,
    message: doc.message,
  });
  return true;
};

const send = async (data) => {
  const doc = await Notification.create({ ...data, status: "PENDING" });
  try {
    mockSend(doc);
    doc.status = "SENT";
  } catch (e) {
    doc.status = "FAILED";
  }
  await doc.save();
  return doc.toObject();
};

const list = async ({ page, limit, skip, filters }) => {
  const query = {};
  if (filters.userId) query.userId = filters.userId;
  if (filters.type) query.type = filters.type;
  if (filters.channel) query.channel = filters.channel;
  if (filters.status) query.status = filters.status;

  const [items, total] = await Promise.all([
    Notification.find(query).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Notification.countDocuments(query),
  ]);
  return { items, page, limit, total, totalPages: Math.ceil(total / limit) };
};

const getById = async (id) => {
  const n = await Notification.findById(id).lean().catch(() => null);
  if (!n) throw errors.notFound("NOTIFICATION_NOT_FOUND", `Notification ${id} not found`);
  return n;
};

const remove = async (id) => {
  const deleted = await Notification.findByIdAndDelete(id).catch(() => null);
  if (!deleted) throw errors.notFound("NOTIFICATION_NOT_FOUND", `Notification ${id} not found`);
  return { id, deleted: true };
};

module.exports = { send, list, getById, remove };
