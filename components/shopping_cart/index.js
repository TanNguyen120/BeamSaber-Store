const express = require('express');
const router = express.Router();
const cartController = require('./cartController');



router.get('/', cartController.viewCart);


router.post('/', cartController.addToCart);

router.delete('/', cartController.removeFromCart);


module.exports = router;


