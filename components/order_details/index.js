const express = require('express');
const router = express.Router();
const orderController = require('./orderController')


router.get('/', orderController.checkShippingInfo, orderController.orderDetailPage);

router.post('/', orderController.checkShippingInfo, orderController.conformOrder);

router.get('/history', orderController.checkShippingInfo, orderController.orderHistory);

router.get('/order_items/:order_id', orderController.checkShippingInfo, orderController.orderItems);


module.exports = router;