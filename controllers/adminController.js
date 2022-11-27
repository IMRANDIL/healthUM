const User = require('../models/userModel');
const Doctor = require('../models/doctorModel')


class Admin {
    getAllUsers = async(req,res,next)=>{
try {
    const users = await User.find({})
    res.status(200).json({
        success:true,
        msg:'Users Fetched',
        users
    })
} catch (error) {
    res.status(500).send({ msg: "Something went wrong!", success: false }); 
}
    }


    getAllDoctors = async(req,res,next)=>{
        try {
            const doctors = await Doctor.find({});
            res.status(200).json({
                success:true,
                msg:'Doctors Fetched',
                doctors
            })
        } catch (error) {
            res.status(500).send({ msg: "Something went wrong!", success: false }); 
        }
    }
}

const AdminClass = new Admin();
module.exports = {AdminClass};