const { json } = require("express");
const express = require("express");
const { productDetails } = require("../product/product_controller");
const router = express.Router();
const adminControler = require("./admin_control");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("./admin/index", {
    layout: "./admin/adminlayout.hbs",
    title: "beamsaber",
  });
});

//------------------------------- render admin tool page -----------------------------------------
router.get("/delete_product", function (req, res, next) {
  res.render("./admin/admin_tool");
});

//-------------------------------- get information from form -------------------------------------------
router.post("/delete_product", adminControler.productDetails);

//
router.get("/add_new_product", function (req, res) {
  res.render("./admin/add_product");
});

module.exports = router;
