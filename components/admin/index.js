const { json } = require("express");
const express = require("express");
const { productDetails } = require("../product/product_controller");
const router = express.Router();
const adminControler = require("./admin_control");
const bodyParser = require("body-parser");


/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("./admin/index", {
    layout: "./admin/adminlayout.hbs",
    title: "beamsaber",
  });
});

//------------------------------- render admin tool page -----------------------------------------
router.get("/product/s", function (req, res, next) {
  res.render("./admin/admin_form_find");
});

//-------------------------------- get information from form -------------------------------------------
router.post("/product/s", adminControler.productDetails);


//
router.get("/addproduct", function (req, res) {
  res.render("./admin/add_product");
});

router.post("/addproduct", adminControler.addNewProduct);

module.exports = router;
