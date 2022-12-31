const Appointment = require("../models/appointmentModel");

class BookAppointment {
  setAppointment = async (req, res, next) => {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).send({ msg: "Something went wrong!", success: false });
    }
  };
}

const appointmentClass = new BookAppointment();
module.exports = { appointmentClass };
