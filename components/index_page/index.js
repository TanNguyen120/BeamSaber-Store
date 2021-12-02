const express = require("express");
const router = express.Router();
const path = require("path");
const mainPageController = require("./page_controller");

router.get("/",mainPageController.advertiseProduct);

module.exports = router;
