const Doctor = require("../models/doctorModel");
const Appointment = require("../models/appointmentModel");

class DoctorContr {
  getDoctorByuserId = async (req, res, next) => {
    try {
      const user = await Doctor.findOne({ userId: req.body.userId });
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User does not exist!",
        });
      }

      res.status(200).json({
        success: true,
        msg: "user doctor fetched",
        user,
      });
    } catch (error) {
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };

  updateDoctor = async (req, res, next) => {
    try {
      const user = await Doctor.findOne({ userId: req.body.userId });
      if (!user) {
        return res.status(404).json({
          success: false,
          msg: "User does not exist!",
        });
      }

      await Doctor.findByIdAndUpdate(user._id, req.body);
      res.status(201).json({
        success: true,
        msg: "Profile Updated!",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };

  getDoctorByDoctorId = async (req, res, next) => {
    try {
      const doctor = await Doctor.findOne({ _id: req.body.doctorId });
      if (!doctor) {
        return res.status(404).json({
          success: false,
          msg: "Doctor does not exist!",
        });
      }
      res.status(200).json({
        success: true,
        msg: "doctor details fetched",
        doctor,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };

  getAppointmentsInfo = async (req, res, next) => {
    try {
      const findDoctorId = await Doctor.findOne({ userId: req.user._id });
      if (!findDoctorId) {
        return res.status(404).json({
          success: false,
          msg: "Doctor does not exist!",
        });
      }

      const appointmentInfo = await Appointment.find({
        doctorId: findDoctorId._id,
      });

      res.status(200).json({
        success: true,
        data: appointmentInfo,
        msg: "appointments info fetched",
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };
}

const doctorClass = new DoctorContr();
module.exports = { doctorClass };
