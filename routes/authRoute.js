const router = require("express").Router();
const { AuthClass } = require("../controllers/authController");

router.post("/signup", AuthClass.signupController);
router.post("/login", AuthClass.loginController);

module.exports = router;
