const express = require("express");
const router = express.Router();
const path = require("path");

// define the controller of this router
const productController = require("./product_controller");

// --------------- rout to list of product if this is index page --------------------------------------------
router.get("/", productController.listOfProduct);


//--------------- Handle filter by category ----------------------------------------------------------------

router.get("/grade/:grade", productController.gradeFilter);





//---------------- Handle find product with multiple condition with pagination ------------------------------------------------------
router.get("/filter", productController.filterProduct);

//=================Handle filter list of products ----------------------------------------------------------
router.get("/list", productController.searchProductWithCond);



//----------------rout to find price -----------------------------------------------------------------------
//router.get("/find_price" , productController.productFindLessThanPrice);
module.exports = router;

//----------- rout to product details if req product details -----------------------------------------------

router.get("/:product_name", productController.productDetails);

router.post("/:product_name", productController.addComment);