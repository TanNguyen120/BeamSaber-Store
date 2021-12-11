const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    email: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "Email_UNIQUE"
    },
    phone: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    role: {
      type: DataTypes.STRING(10),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    bank_account: {
      type: DataTypes.STRING(15),
      allowNull: true
    },
    password: {
      type: DataTypes.STRING(200),
      allowNull: true
    },
    account_status: {
      type: DataTypes.STRING(20),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'user',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "user_id" },
        ]
      },
      {
        name: "Email_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "email" },
        ]
      },
    ]
  });
};
