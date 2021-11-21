const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./login_and_register', { title: 'beamsaber' });
});

module.exports = router;