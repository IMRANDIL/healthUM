const router = require('express').Router();
const {doctorClass} = require('../controllers/doctorController')
const {authMiddleware} = require('../middlewares/authMiddleware')


router.post('/get-doctor-info-by-userId',authMiddleware,doctorClass.getDoctorByuserId);
router.put('/update-doctor-profile',authMiddleware,doctorClass.updateDoctor)


module.exports = router
