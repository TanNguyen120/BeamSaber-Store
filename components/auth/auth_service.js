const { models } = require("../../models");
const { Op } = require("sequelize");
const { Sequelize } = require("sequelize");


exports.findEmail = (userEmail) => {
    return models.user.findOne({ where: { email: userEmail } }, { raw: true });
}

exports.findUserById = (id) => {
    return models.user.findByPk(id, { raw: true });
}

exports.createUser = (userId, userName, userEmail, userPassword) => {
    return models.user.create(
        {
            user_id: userId,
            name: userName,
            email: userEmail,
            password: userPassword,
            role: "user"
        }
    );
}

exports.lastUser = () => {
    return models.user.findOne({
        attributes: [[Sequelize.fn('max', Sequelize.col('user_id')), "id"]],
        raw: true
    });
}

exports.findUser = (userName) => {
    return models.user.findOne({ where: { name: userName } }, { raw: true });
}