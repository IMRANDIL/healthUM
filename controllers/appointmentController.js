const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");

class BookAppointment {
  setAppointment = async (req, res, next) => {
    try {
      req.body.status = "pending";
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
      const findDoctor = await Doctor.findOne({ _id: req.body.doctorId });
      if (!findDoctor) {
        return res.status(404).json({
          success: false,
          msg: "Doctor does not exist!",
        });
      }
      findDoctor.unseenNotifications.push({
        type: "New appointment request",
        msg: `A new appointment request has been made by ${req.body.user.name}`,
        onClickPath: "/doctor/appointments",
      });
      await findDoctor.save();
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };
}

const appointmentClass = new BookAppointment();
module.exports = { appointmentClass };
