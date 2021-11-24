const adminService = require("./admin_service");
const productService = require("../product/product_service");
const { query } = require("express");


/**
 * This function will Find all item that have matching id in req url
 * @param {*} req
 * @param {*} res
 */
 exports.productDetails = async (req, res) => {
    const id = parseInt(req.body.product_id);
    console.log("admin want to delete product no: " + id);
    if(!isNaN(id))
    {
        const productDetailstoDel = await productService.findItem(id);
        console.log(
          "found item: " +
            productDetailstoDel.name +
            " with id= " +
            productDetailstoDel.product_id +
            " and have theme: " +
            productDetailstoDel.grade
        );
        res.render("./admin/delete_product", { productDetailstoDel, layout: "./admin/adminlayout.hbs" });
    }
    else{
        res.render("./error");
    }
  
  };

