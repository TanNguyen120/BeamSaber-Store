const { models } = require("../../models");


exports.list = (page = 0, item_per_page = 9) => {
  // findAll function will return all row of product table
  // offset is what row to get data and limit is number of row for each times we call this function
  return models.product.findAll({
    offset: page * item_per_page,
    limit: item_per_page,
    raw: true,
  });
};
