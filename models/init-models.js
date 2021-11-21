var DataTypes = require("sequelize").DataTypes;
var _order = require("./order");
var _product = require("./product");
var _product_comment = require("./product_comment");
var _product_list = require("./product_list");
var _user = require("./user");

function initModels(sequelize) {
  var order = _order(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_comment = _product_comment(sequelize, DataTypes);
  var product_list = _product_list(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  order.belongsToMany(product, { as: 'product_id_products', through: product_list, foreignKey: "order_id", otherKey: "product_id" });
  product.belongsToMany(order, { as: 'order_id_orders', through: product_list, foreignKey: "product_id", otherKey: "order_id" });
  product_list.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(product_list, { as: "product_lists", foreignKey: "order_id"});
  product_comment.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_comment, { as: "product_comments", foreignKey: "product_id"});
  product_list.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_list, { as: "product_lists", foreignKey: "product_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  product_comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(product_comment, { as: "product_comments", foreignKey: "user_id"});

  return {
    order,
    product,
    product_comment,
    product_list,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
