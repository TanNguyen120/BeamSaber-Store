// ************************************ This is the controller part of the MVC model ***********************************************
const productService = require("./product_service");

/**
 * This will call product service to list all product with req query offset and limit
 *
 * @param {*} req
 * @param {*} res
 */
exports.listOfProduct = async (req, res) => {
    const page = parseInt(req.query.page);
    const items_limit = parseInt(req.query.items);
    const pagepass = page;
    console.log(
        "find all item with offset: " + page + " and limit: " + items_limit
    );
    if (!isNaN(page) && page > 0) {
        if (items_limit > 0) {
            const productList = await productService.list(page - 1, items_limit);
            res.render("./product/all_product", {
                productList: productList,
                pagepass: page,
            });
        } else {
            const productList = await productService.list(page - 1);
            res.render("./product/all_product", {
                productList: productList,
                pagepass: page,
            });
        }
    } else {
        const productList = await productService.list();
        res.render("./product/all_product", {
            productList: productList,
            pagepass: 1,
        });
    }
};

//----------------------------------------------------------------------------------------------------------------------------------------

/**
 * This function will Find all item that have matching id in req url
 * @param {*} req
 * @param {*} res
 */
exports.productDetails = async (req, res) => {
    const productId = req.query.id;
    try {
        const productDetails = await productService.findItem(req.query.id);
        ("found item: " + JSON.stringify(productDetails));
        const listComments = await productService.findComments(productId);
        res.render("./product/product_details", { productDetails, listComments });

    } catch (err) {
        console.error("errr:" + err);
        res.render("error", { message: "cant find product: " + req.params.product_name });
        throw err;
    }

};

//----------------------------------------------------------------------------------------------------------------------------------------

/**
 * this function will read req url and find all product with Less than or equal to giving Price. If find noting it will render error page
 *
 * @param {*} req
 * @param {*} res
 */
exports.productFindLessThanPrice = async (req, res) => {
    const price = parseFloat(req.query.price);
    if (!isNaN(price)) {
        const productList = await productService.findLessThanPrice(req.query.price);
        console.log(productList);
        if (productList != null) {
            res.render("./product/all_product", { productList });
        } else {
            res.render("./error.hbs");
        }
    } else {
        console.log("cant find product with price less than " + price);
        res.render("./error.hbs");
    }
};

//----------------------------------------------------------------------------------------------------------------------------------------

exports.gradeFilter = async (req, res) => {
    const page = !isNaN(parseInt(req.query.page)) ? parseInt(req.query.page) : 0;
    const pagepass = page == 0 ? 1 : page;
    const gradeCond = req.params.grade;
    console.log(" grade is: " + JSON.stringify(req.params));
    console.log("page is: " + page);
    const productList = await productService.findAllGrade(
        gradeCond, page
    );
    if (productList.length == 0) {
        res.status(404).end("no product found");
    }
    else {
        res.render("./product/all_product", {
            productList,
            pagepass,
            filter: "grade",
        });
    }
};

//----------------------------------------------------------------------------------------------------------------------------------------

/**
 * Searching list of product where matching condition
 *
 * @param {*} req
 * @param {*} res
 */
exports.searchProductWithCond = async (req, res) => {
    const condition = Object.keys(req.query)[0];
    console.log("condition is: " + condition);
    // if page is not specified we will search from id = 1
    const page = !isNaN(parseInt(req.query.page)) ? page : 0;
    // but we need to pass page is 1 if we search at the start
    const pagepass = page ? 0 : 1;
    switch (condition) {
        case "name":
            {
                const nameCond = req.query.value;
                const productList = await productService.findListNameCond(!isNaN(page) ? page : 0,
                    nameCond
                );
                if (productList.length != 0) {
                    res.render("./product/list_product_with_filter", {
                        productList,
                        pagepass,
                        filter: "name",
                    });
                } else {
                    res.render("error");
                    console.error("cant find product with name");
                }
                break;
            }
        case "grade":
            {
                const gradeCond = req.query.grade;
                const productGradeList = await productService.findAllGrade(
                    gradeCond, !isNaN(page) ? page : 0
                );
                res.render("./product/list_product_with_filter", {
                    productGradeList,
                    pagepass,
                    filter: "grade",
                });
            }

    }
};

//----------------------------------------------------------------------------------------------------------------------------------------

exports.addComment = async (req, res, next) => {
    const name = req.params.product_name
    const comment = req.body.comment;
    const productId = parseInt(req.query.id);
    const userId = parseInt(req.user.id);
    const star = parseInt(req.body.star);
    try {
        await productService.addComment(productId, userId, comment, star);
        res.redirect("/product/" + name + "?id=" + productId);
    } catch (err) {
        console.log("ERR while query: " + err);
        res.render("error", { message: err });
        throw err;
    }
}