const { models } = require("../../models");
const { Op } = require("sequelize");



exports.findProductWithName = (nameCondition) => {
    return models.product.findAll({
        where: {
            name: {
                [Op.substring]: nameCondition,
            },
        },
        raw: true,
    });
};

