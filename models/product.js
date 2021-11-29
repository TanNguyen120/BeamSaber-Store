const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('product', {
    product_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    description: {
      type: DataTypes.STRING(5000),
      allowNull: true
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    universe: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    grade: {
      type: DataTypes.STRING(20),
      allowNull: true
    },
    link_picture: {
      type: DataTypes.STRING(100),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'product',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "product_id" },
        ]
      },
    ]
  });
};
