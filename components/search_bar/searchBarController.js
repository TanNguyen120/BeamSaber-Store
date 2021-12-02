const searchBarService = require("./searchBarService");

/**
 * Function handle search request of client
 *
 * @param {*} req have some value like search condition and value 
 * @param {*} res render the result
 */
 exports.searchWithCondition = async function(req, res) {

    // Prepare variable for model to query
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 1;
    const pagePass = page == 0 ? 1 : page;
    const searchCondition = req.query.search_with;
    const value = req.query.value;
    console.log("QUERY STRING: " + page + " " + searchCondition + " " + value);
    const filterCondition = "?search_with="+searchCondition+"&value="+value;

    // use switch case to search with given query string 
    switch (searchCondition) {
        case "name":{
            console.log("search name have substring: " + value); 
            const listOfProduct = await searchBarService.findProductWithName(value,page-1);
            if(listOfProduct.length == 0)
            {
                res.status(500).render('error',{message: "there no product with name: " + value});
                
            }
            else {
                res.status(200).render("product/list_product_with_filter",{productList:listOfProduct,pagePass,filterCondition})
                
            }
            break;
        }
        case "price_acs":{
            try{
                console.log("filter price high to low");
                const listOfProduct = await searchBarService.filterPriceAscent(page-1);
                res.status(200).render("product/list_product_with_filter",{productList:listOfProduct,pagePass,filterCondition})
            }
            catch(err){
                res.render('error',{message: "something wrong happen"})
                console.err(err);
                throw err;
            }
            break;
        }
        case "newness":{

        }
        
    }

}
