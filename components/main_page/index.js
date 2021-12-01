const express = require("express");
const router = express.Router();
const path = require("path");
const mainPageController = require("./mainPageController");

router.get("/",mainPageController.advertiseProduct);

module.exports = router;
