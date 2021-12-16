const express = require('express');
const router = express.Router();
const orderController = require('./orderController')

/* GET home page. */
router.get('/', orderController.checkShippingInfo, orderController.orderDetailPage);


module.exports = router;