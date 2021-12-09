const express = require('express');
const router = express.Router();
const authController = require('./auth_controller');

router.get('/', function (req, res, next) {
    res.render('./login_and_register/index');
})



// we will use bcrypt to encrypt the password
router.post("/", authController.registerUser);

module.exports = router;