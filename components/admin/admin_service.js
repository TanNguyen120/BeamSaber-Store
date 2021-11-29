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

exports.addProduct =(
  nid,
  nname,
  ndescription,
  ngrade,
  nuniverse,
  nprice,
  nlink
) => {
  console.log("create: " + nid + typeof(nid) + " name: " + nname + " price: " + nprice + " " + ndescription + " " + ngrade);
  const product = models.product.create({
    product_id: nid,
    name: nname,
    description: ndescription,
    price: nprice,
    universe: nuniverse,
    grade: ngrade,
    link_picture: nlink
  });
};


exports.delProduct = (condId)=>{
  console.log("delete product with id: " + condId);
  models.product.destroy({
    where: {
      product_id: condId
    }
  })
}
