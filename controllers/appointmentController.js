const Appointment = require("../models/appointmentModel");

class BookAppointment {
  setAppointment = async (req, res, next) => {
    try {
      req.body.status = "pending";
      const newAppointment = new Appointment(req.body);
      await newAppointment.save();
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };
}

const appointmentClass = new BookAppointment();
module.exports = { appointmentClass };
