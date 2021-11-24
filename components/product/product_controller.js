// ************************************ This is the controller part of the MVC model ***********************************************
const productService = require("./product_service");

/**
 * This will call product service to list all product with req querry offset and limit
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
      pagepass: page,
    });
  }
};

/**
 * This function will Find all item that have matching id in req url
 * @param {*} req
 * @param {*} res
 */
exports.productDetails = async (req, res) => {
  const productDetails = await productService.findItem(req.query.id);
  console.log("found item: " + productDetails);
  res.render("./product/product_details", { productDetails });
};

/**
 * this function will read req url and find all product with mathching Grade. If find noting it will render error page
 *
 * @param {*} req
 * @param {*} res
 */
exports.productFindGrade = async (req, res) => {
  console.log("client want filter all: " + req.query.grade_filter);
  const productGradeList = await productService.findAllGrade(
    req.query.grade_filter
  );
  if (productGradeList != null) {
    const productList = productGradeList;
    res.render("./product/all_product", { productList: productList });
  } else {
    res.render("./error.hbs");
  }
};

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

exports.productFindName = async (nameCond) => {
  console.log("client want to find product with name: " + name);
};

exports.searchProductwCond = async (req, res) => {
  console.log(
    " client want to seach with condition: " +
      req.query.search_with +
      " with value: " +
      req.query.value
  );
  switch (req.query.search_with) {
    case "name": {
      const nameCond = req.query.value;
      const productList = await productService.findListNameCond(nameCond);
      if (productList.length != 0) {
        res.render("./product/all_product", { productList });
      } else {
        res.render("error");
        console.error("cant find product with name");
      }
      break;
    }
  }
};
