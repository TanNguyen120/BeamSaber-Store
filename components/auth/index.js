const express = require('express');
const router = express.Router();
// using passport for authorization

const passport = require("../auth/passport")


router.get('/', function (req, res, next) {
    res.render('./login_and_register/index', { title: 'beamsaber login' });
});


// use passport middleware



router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);


module.exports = router;