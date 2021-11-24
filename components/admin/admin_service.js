const { models } = require("../../models");
const { Op } = require("sequelize");


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