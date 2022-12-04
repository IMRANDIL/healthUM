const User = require('../models/userModel');
const Doctor = require('../models/doctorModel')


class Admin {
    getAllUsers = async(req,res,next)=>{
try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page-1)*limit;
    const totalUsers = await User.countDocuments();

    const pages = Math.ceil(totalUsers/limit);
    const users = await User.find({}).select('-password').skip(skip).limit(limit)
    res.status(200).json({
        success:true,
        msg:'Users Fetched',
        pages: pages,
        users
    })
} catch (error) {
    res.status(500).send({ msg: "Something went wrong!", success: false }); 
}
    }


    getAllDoctors = async(req,res,next)=>{
        try {


            const page = parseInt(req.query.page) || 1;
            const limit = parseInt(req.query.limit) || 5;
            const skip = (page-1)*limit;
            const totalUsers = await User.countDocuments();
        
            const pages = Math.ceil(totalUsers/limit);


            const doctors = await Doctor.find({}).select('-password').skip(skip).limit(limit);
            res.status(200).json({
                success:true,
                msg:'Doctors Fetched',
                pages:pages,
                doctors
            })
        } catch (error) {
            res.status(500).send({ msg: "Something went wrong!", success: false }); 
        }
    }
}

const AdminClass = new Admin();
module.exports = {AdminClass};