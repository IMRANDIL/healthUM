const Doctor = require('../models/doctorModel')


class DoctorContr {
getDoctorByuserId = async(req,res,next)=>{
try {
    const user = await Doctor.findOne({userId: req.body.userId});
    if(!user){
        return res.status(404).json({
            success:false,
            msg:'User does not exist!'
        })
    }

    res.status(200).json({
        success:true,
        msg:'user doctor fetched',
        user

    })

} catch (error) {
    res.status(500).send({ msg: "Something went wrong!", success: false });
}
}
};

const doctorClass = new DoctorContr();
module.exports = {doctorClass}