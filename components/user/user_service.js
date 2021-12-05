const { models } = require("../../models");
const { Op } = require("sequelize");

exports.findUser = (userId) => {
    return models.user.findByPk(userId, { raw: true });
}

exports.updateUser = (userId, userPhone, userAddress, userBankAccount) => {
    return models.user.update(
        {
            phone: userPhone, address: userAddress,
            bank_account: userBankAccount
        },
        { where: { user_id: userId } });
}