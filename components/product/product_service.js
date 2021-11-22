const { models } = require("../../models");

// ---------------------- find all available product in database --------------------------------------
exports.list = (page = 0, item_per_page = 12) => {
  // findAll function will return all row of product table
  // offset is what row to get data and limit is number of row for each times we call this function
  return models.product.findAll({
    offset: page * item_per_page,
    limit: item_per_page,
    raw: true,
  });
};

// ----------------------- find an item with given id --------------------------------------------------
exports.findItem = (id) => {
  
  console.log("finding item with id= " +id);
  //find item with matching id ( primary key ) with findPK function
  return models.product.findByPk(id, { raw: true });
};
