const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./signup/signupCustom', { title: 'beamsaber' });
});

module.exports = router;