const express = require("express");
const router = express.Router();
const path = require("path");

// define the controller of this router
const productController = require("./product_controller");

/* GET product index page. */
router.get("/", productController.listOfProduct);

//----------- go to product details page -------------------







router.get("/details", productController.productDetails);

module.exports = router;
