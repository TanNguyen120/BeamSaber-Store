const express = require('express');
const router = express.Router();
const cartController = require('./cartController');


/* GET home page. */
router.get('/', cartController.viewCart);


router.post('/', cartController.addToCart);
module.exports = router;