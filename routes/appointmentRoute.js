const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { appointmentClass } = require("../controllers/appointmentController");

module.exports = router;
