const express = require('express');
const router = express.Router();
const cartController = require('./cartController');


/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('shoping_cart/index', { title: 'beamsaber' });
});

router.post('/', cartController.addToCart);
module.exports = router;