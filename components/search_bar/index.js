const express = require("express");
const router = express.Router();
const path = require("path");
const searchBarController = require("./searchBarController")


router.get("/", searchBarController.searchWithCondition);


//router.post("/", productsController.searchWithCondition);


module.exports = router;

