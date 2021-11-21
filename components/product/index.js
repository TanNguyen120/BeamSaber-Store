const express = require('express');
const router = express.Router();

// define the controller of this router
const productController = require("./product_controller")

/* GET product index page. */
router.get('/', productController.listOfProduct);

module.exports = router;