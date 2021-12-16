const express = require('express');
const router = express.Router();
const cartController = require('./cartController');



router.get('/', cartController.viewCart);

router.post('/', cartController.addToCart);

router.delete('/', cartController.removeFromCart);

router.put('/', cartController.updateCartItem);


module.exports = router;


