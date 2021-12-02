const express = require('express');
const router = express.Router();
// using passport for authorization

const passport = require("./passport")


router.get('/', function (req, res, next) {
    res.render('./login_and_register/index',{wrongPass: req.query.wrongPass !== undefined});
});


// use passport middleware
router.post('/',
    passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login?wrongPass'
    })
);

router.get("/logout",(req, res)=>{
    req.logout();
    res.redirect('/');
})
module.exports = router;