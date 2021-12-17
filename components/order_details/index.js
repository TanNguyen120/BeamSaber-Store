const express = require('express');
const router = express.Router();
const orderController = require('./orderController')


router.get('/', orderController.checkShippingInfo, orderController.orderDetailPage);

router.post('/', orderController.checkShippingInfo, orderController.conformOrder);


module.exports = router;