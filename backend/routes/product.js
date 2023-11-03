const { createProduct, getAllProducts } = require("../controllers/product");
const {authorizationMiddleware, authorizedAdmin} = require("../middlewares/auth");

const router = require("express").Router();

router.route("/create").post(authorizationMiddleware,authorizedAdmin,createProduct);

router.route("/").get(getAllProducts);

module.exports = router;