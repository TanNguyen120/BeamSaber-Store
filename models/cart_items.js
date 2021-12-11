const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart_items', {
    cart_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'cart',
        key: 'cart_id'
      }
    },
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'product',
        key: 'product_id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: true
    },
    order_id: {
      type: DataTypes.STRING(45),
      allowNull: true,
      references: {
        model: 'order',
        key: 'order_id'
      }
    }
  }, {
    sequelize,
    tableName: 'cart_items',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cart_id" },
          { name: "product_id" },
        ]
      },
      {
        name: "FK_cart_item_product_idx",
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
      {
        name: "FK_cart_item_order_idx",
        using: "BTREE",
        fields: [
          { name: "order_id" },
        ]
      },
    ]
  });
};
