const express = require('express');
const router = express.Router();

/* GET product page. */
router.get('/', function(req, res, next) {
    res.render('./product/product', { title: 'beamsaber' });
});

module.exports = router;