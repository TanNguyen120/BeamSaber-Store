const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('./admin/adminIndex', { title: 'beamsaber' });
});

module.exports = router;


/* GET ADMIN TOOL */
router.get('/admin-tool', function(req, res, next) {
    res.render('./admin/tables', { title: 'beamsaber' });
});


router.get('/log', function(req, res, next) {
    res.render('./admin/login', { title: 'beamsaber' });
});