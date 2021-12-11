var DataTypes = require("sequelize").DataTypes;
var _cart = require("./cart");
var _cart_items = require("./cart_items");
var _order = require("./order");
var _product = require("./product");
var _product_comment = require("./product_comment");
var _user = require("./user");

function initModels(sequelize) {
  var cart = _cart(sequelize, DataTypes);
  var cart_items = _cart_items(sequelize, DataTypes);
  var order = _order(sequelize, DataTypes);
  var product = _product(sequelize, DataTypes);
  var product_comment = _product_comment(sequelize, DataTypes);
  var user = _user(sequelize, DataTypes);

  cart.belongsToMany(product, { as: 'product_id_products', through: cart_items, foreignKey: "cart_id", otherKey: "product_id" });
  product.belongsToMany(cart, { as: 'cart_id_carts', through: cart_items, foreignKey: "product_id", otherKey: "cart_id" });
  product.belongsToMany(user, { as: 'user_id_users', through: product_comment, foreignKey: "product_id", otherKey: "user_id" });
  user.belongsToMany(product, { as: 'product_id_product_product_comments', through: product_comment, foreignKey: "user_id", otherKey: "product_id" });
  cart_items.belongsTo(cart, { as: "cart", foreignKey: "cart_id"});
  cart.hasMany(cart_items, { as: "cart_items", foreignKey: "cart_id"});
  cart_items.belongsTo(order, { as: "order", foreignKey: "order_id"});
  order.hasMany(cart_items, { as: "cart_items", foreignKey: "order_id"});
  cart_items.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(cart_items, { as: "cart_items", foreignKey: "product_id"});
  product_comment.belongsTo(product, { as: "product", foreignKey: "product_id"});
  product.hasMany(product_comment, { as: "product_comments", foreignKey: "product_id"});
  order.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(order, { as: "orders", foreignKey: "user_id"});
  product_comment.belongsTo(user, { as: "user", foreignKey: "user_id"});
  user.hasMany(product_comment, { as: "product_comments", foreignKey: "user_id"});

  return {
    cart,
    cart_items,
    order,
    product,
    product_comment,
    user,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
