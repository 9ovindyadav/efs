const { userLogin, userRegister, forgotPassword, resetPassword, getUser } = require("../controllers/user");
const {authorizationMiddleware} = require("../middlewares/auth");

const router = require("express").Router() ;

router.route("/login").post(userLogin);
router.route("/register").post(userRegister);
router.route("/password/forgot").post(forgotPassword);
router.route("/password/reset/:token").patch(resetPassword);
router.route("/").get(authorizationMiddleware,getUser);

module.exports = router ;