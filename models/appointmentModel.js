const mongoose = require("mongoose");

const { Schema } = mongoose;

const appointmentSchema = new Schema({

},{
    timestamps:true
});


module.exports = mongoose.model('Appointment', appointmentSchema)