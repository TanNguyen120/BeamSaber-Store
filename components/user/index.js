const express = require("express");
const router = express.Router();
const path = require("path");
const userController = require("./user_controller");


router.get("/:name/profile", userController.userProfile);


router.post("/:name/profile", userController.updateProfile);


module.exports = router;

