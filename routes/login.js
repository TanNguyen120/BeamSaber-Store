const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./login/login', { title: 'beamsaber' });
});

module.exports = router;