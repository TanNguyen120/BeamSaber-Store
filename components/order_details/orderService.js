const { models } = require("../../models");
const { Op } = require("sequelize");


exports.findUser = (userId) => {
    return models.user.findByPk(
        userId,
        { raw: true }
    );
}


exports.countCartItems = (cartId) => {
    return models.cart_items.findAndCountAll({
        where: { cart_id: cartId },
        include: 'product',
        raw: true
    })
}

exports.findCart = (cartID) => {
    return models.cart.findByPk(
        cartID,
        { raw: true }
    );
}

exports.findUser = (userID) => {
    return models.user.findByPk(
        userID,
        { raw: true }
    );
}