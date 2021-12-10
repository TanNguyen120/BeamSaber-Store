const { models } = require("../../models");
const { Op } = require("sequelize");
/**
 * use for find all available  product in data base
 *
 * @param {number} [page=0] => page number
 * @param {number} [item_per_page=12] => number of item will render
 * @return {*}  => raw data of all product in data base
 */
exports.list = (page = 0, item_per_page = 12) => {
  // findAll function will return all row of product table
  // offset is what row to get data and limit is number of row for each times we call this function
  return models.product.findAll({
    offset: page * item_per_page,
    limit: item_per_page,
    raw: true,
  });
};

/**
 * Use for find an item with given id
 *
 * @param {*} id
 * @return {*} raw data of an object with matching id
 */
exports.findItem = (id) => {
  console.log("finding item with id= " + id);
  //find item with matching id ( primary key ) with findPK function
  return models.product.findByPk(id, { raw: true });
};

exports.findComments = (pid) => {
  return models.product_comment.findAndCountAll(
    {
      where: { product_id: pid },
      include: 'user',
      raw: true
    });
}

/**
 *Use this for find all product with matching grade
 *
 * @param {*} gradeCond
 * @return {*} raw data of product
 */
exports.findAllGrade = (gradeCond, page = 0, items_per_page = 12) => {
  console.log("haaaaa find this grade: " + gradeCond);
  return models.product.findAll({
    where: { grade: gradeCond },
    offset: page * items_per_page,
    limit: items_per_page,
    raw: true,
  });
};

/**
 *Use this for find all product  which have price lower or equal to a number
 *
 * @param {*} price
 * @return {*} raw data of list product
 */
exports.findLessThanPrice = (priceCond) => {
  return models.product.findAll({
    where: {
      price: {
        [Op.lte]: priceCond,
      },
    },
    raw: true,
  });
};


exports.findListNameCond = (namecond) => {
  return models.product.findAll({
    where: {
      name: { [Op.substring]: namecond }
    },
    raw: true
  });
};

exports.addComment = (productId, userId, postComment, postStar) => {
  models.product_comment.create({
    product_id: productId,
    user_id: userId,
    comment: postComment,
    rate: postStar
  });
}

exports.findRelate = (productGrade, randomOffset) => {
  return models.product.findAll(
    {
      where: { grade: productGrade },
      offset: randomOffset,
      limit: 6
    })
}