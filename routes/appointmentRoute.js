const router = require("express").Router();
const { authMiddleware } = require("../middlewares/authMiddleware");
const { appointmentClass } = require("../controllers/appointmentController");

router.post(
  "/book-appointment",
  authMiddleware,
  appointmentClass.setAppointment
);

module.exports = router;
