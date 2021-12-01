const { models } = require("../../models");
const { Op } = require("sequelize");

/**
 * use for find all available  product in data base
 *
 * @param {number} [page=0] => page number
 * @param {number} [item_per_page=12] => number of item will render
 * @return {*}  => raw data of all product in data base
 */
exports.lastProducts = (page = 0, item_per_page = 6) => {
    // findAll function will return all row of product table
    // offset is what row to get data and limit is number of row for each times we call this function
    return models.product.findAll(
    {
        order: [['product_id', "DESC"]],
        offset: page * item_per_page,
        limit: item_per_page,
        raw: true
    });
};
