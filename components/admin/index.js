const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./admin/index', { layout: "./admin/adminlayout.hbs" ,title: 'beamsaber' });
});

module.exports = router;