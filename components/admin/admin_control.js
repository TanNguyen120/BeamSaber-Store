const adminService = require("./admin_service");
const productService = require("../product/product_service");
const { query } = require("express");


/**
 * This function will Find item that have matching id in req url
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


  exports.addNewProduct = async function(req, res, next){
    id = parseInt(req.body.product_id);
    product_name = req.body.name;
    grade = req.body.grade;
    universe = req.body.universe;
    price = parseFloat(req.body.price);
    description = req.body.description;
    picture_link = req.body.link;

    

    const findingProduct = await productService.findItem(id);
    if(findingProduct != null) {
      res.end("that product already exists");
    }
    else {
      const createProduct = await adminService.addProduct(id,product_name,description,grade,universe,price,picture_link);
      res.render("./admin/index" , {layout: "./admin/adminlayout.hbs"});
    }
  }

  exports.DeleteProduct = async function(req, res, next){
    id = parseInt(req.body.id);
    const productDel = adminService.delProduct(id);
    res.render("./admin/index" , {layout: "./admin/adminlayout.hbs"});
  }

