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

exports.filterPriceAscent = (page,limit = 12)=>{
    return models.product.findAll({
        order: [["price", "ASC"]],
        limit: 12,
        offset: page * limit,
    },{

        raw: true
    }
    )
}

