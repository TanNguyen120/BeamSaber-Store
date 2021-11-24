const express = require("express");
const router = express.Router();
const path = require("path");

// define the controller of this router
const productController = require("./product_controller");

// --------------- rout to list of product if this is index page --------------------------------------------
router.get("/", productController.listOfProduct);



//----------- rout to product details if req product details -----------------------------------------------

router.get("/details", productController.productDetails);


//---------------- Handle find grade -----------------------------------------------------------------------
router.get("/filter_grade",productController.productFindGrade);



//----------------rout to find price -----------------------------------------------------------------------
router.get("/find_price" , productController.productFindLessThanPrice);


//---------------------- handle search request with another router -----------------------------------------

router.get("/search",productController.searchProductwCond);

//-------------------------- handle search with name -------------------------------------------------------


module.exports = router;




