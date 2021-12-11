const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('cart', {
    cart_id: {
      type: DataTypes.STRING(45),
      allowNull: false,
      primaryKey: true
    },
    user_id: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    total_cost: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'cart',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "cart_id" },
        ]
      },
    ]
  });
};
