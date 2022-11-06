const router = require("express").Router();
const { AuthClass } = require("../controllers/authController");
const { authMiddleware } = require("../middlewares/authMiddleware");

router.post("/signup", AuthClass.signupController);
router.post("/login", AuthClass.loginController);
router.post("/getUserInfo", authMiddleware, AuthClass.getUserInfoController);

module.exports = router;
