// This is the controller part of the MVC model


const productService = require('./product_service');


// we use async and await to make a promise that when the product service get all the data we will render it
exports.listOfProduct = async (req, res) => {
    // checking what page the router want to get
    if(!isNaN(req.query.page) && req.query.page > 0){
        const productList = await productService.list( req.query.page - 1) ;
        res.render('./product/all_product', {productList});
        console.log(req.query);
    }
    else{
        console.log(req.query);
        const productList = await productService.list(0);
        res.render('./product/all_product', {productList});
        
    }
}


// ----------------------- render the product details page base on id in http request packet -------------------------------
exports.productDetails = async (req,res) =>{
    const productDetails = await productService.findItem(req.query.id);
    console.log( "found item: " + productDetails.name + " with id= " + productDetails.product_id );
    res.render('./product/product_details',{productDetails});
}