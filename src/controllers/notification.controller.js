const notificationService = require("../services/notification.service");
const { success } = require("../utils/response");
const { parsePagination } = require("../utils/pagination");

const send = async (req, res) => {
  const n = await notificationService.send(req.body);
  success(req, res, n, 201);
};

const list = async (req, res) => {
  const { page, limit, skip } = parsePagination(req.query);
  const { userId, type, channel, status } = req.query;
  const result = await notificationService.list({
    page,
    limit,
    skip,
    filters: { userId, type, channel, status },
  });
  success(req, res, result);
};

const getById = async (req, res) => {
  const n = await notificationService.getById(req.params.id);
  success(req, res, n);
};

const remove = async (req, res) => {
  const r = await notificationService.remove(req.params.id);
  success(req, res, r);
};

module.exports = { send, list, getById, remove };
