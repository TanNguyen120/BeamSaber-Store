// This is the controller part of the MVC model


const productService = require('./product_service');
let current_page = 0;


// we use async and await to make a promise that when the product service get all the data we will render it
exports.listOfProduct = async (req, res) => {

    
    

    // checking what page the router want to get
    if(!isNaN(req.query.page) && req.query.page >0){
        const productList = await productService.list(req.query.page - 1 );
        current_page = req.query.page - 1 ;
        res.render('./product/product', {productList});
    }
    else if(req.query.page = "nextpage")
    {
        current_page +=1;
        const productList = await productService.list(current_page);
        res.render('./product/product', {productList});
    }
    else if(req.query.page = "prevpage"){
        current_page = current_page -2;
        console.log("i want to go back");
        const productList = await productService.list(current_page);
        res.render('./product/product', {productList});
    }
    else{
        const productList = await productService.list(0);
        current_page = 0;
        res.render('./product/product', {productList});
    }

    
    // the parameter producList is the raw data object that we get with the product service and we respone to render the productlist 
    
}