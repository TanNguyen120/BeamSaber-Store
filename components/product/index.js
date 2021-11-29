const express = require("express");
const router = express.Router();
const path = require("path");

// define the controller of this router
const productController = require("./product_controller");

// --------------- rout to list of product if this is index page --------------------------------------------
router.get("/", productController.listOfProduct);


//--------------- Handle filter by category ----------------------------------------------------------------

router.get("/grade/:grade",productController.gradeFilter);


//----------- rout to product details if req product details -----------------------------------------------

router.get("/:product_name", productController.productDetails);


//---------------- Handle find grade with pagniation ------------------------------------------------------
router.get("/filter", productController.searchProductWithCond);



//----------------rout to find price -----------------------------------------------------------------------
//router.get("/find_price" , productController.productFindLessThanPrice);
module.exports = router;