const Appointment = require("../models/appointmentModel");
const Doctor = require("../models/doctorModel");
const User = require("../models/userModel");
const moment = require("moment");

class BookAppointment {
  setAppointment = async (req, res, next) => {
    try {
      const ifAlreadyApplied = await Appointment.findOne({
        userId: req.body.userId,
        doctorId: req.body.doctorId,
      });

      if (ifAlreadyApplied) {
        return res.status(400).json({
          success: false,
          msg: "You already applied for appointment!",
        });
      }

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
      const doctorUserId = findDoctor.userId;
      const findDoctorUserId = await User.findOne({ _id: doctorUserId });
      if (!findDoctorUserId) {
        return res.status(404).json({
          success: false,
          msg: "Doctor user does not exist!",
        });
      }
      findDoctorUserId.unseenNotifications.push({
        type: "New appointment request",
        msg: `A new appointment request has been made by ${req.body.userInfo.name}`,
        onClickPath: "/doctor/appointments",
      });
      await findDoctorUserId.save();
      res.status(200).json({
        success: true,
        msg: "appointment for booking sent",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };

  checkAvailability = async (req, res, next) => {
    try {
      const date = moment(req.body.date, "DD-MM-YYYY").toISOString();
      const fromTime = moment(req.body.timing, "HH:mm")
        .subtract(60, "minutes")
        .toISOString();
      const toTime = moment(req.body.timing, "HH:mm")
        .add(60, "minutes")
        .toISOString();
      const doctorId = req.body.doctorId;
      const findDoctor = await Doctor.findOne({ _id: doctorId });
      if (!findDoctor) {
        return res.status(404).json({
          success: false,
          msg: "Doctor does not exist!",
        });
      }
      const appointments = await Appointment.find({
        doctorId,
        date,
        timing: { $gte: fromTime, $lte: toTime },
        status: "approved",
      });
      if (appointments.length > 0) {
        return res.status(404).json({
          success: false,
          msg: "Appointments Not Available",
        });
      }
      res.status(200).json({
        success: true,
        msg: "Appointments Available, Book now!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };
}

const appointmentClass = new BookAppointment();
module.exports = { appointmentClass };
