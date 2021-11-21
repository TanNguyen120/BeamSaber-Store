const express = require('express');
const router = express.Router();

// define the controller of this router
const productController = require("./product-controller")

/* GET product page. */
router.get('/', productController.listOfProduct);

module.exports = router;