const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./shoping_cart', { title: 'beamsaber' });
});

module.exports = router;