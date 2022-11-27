const router = require('express').Router();
const {AdminClass} = require('../controllers/adminController')
const {authMiddleware} = require('../middlewares/authMiddleware')


router.post('/allUsers',authMiddleware,AdminClass.getAllUsers);
router.post('/allDoctors',authMiddleware,AdminClass.getAllDoctors)




module.exports = router;