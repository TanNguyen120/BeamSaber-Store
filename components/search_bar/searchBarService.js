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

exports.filterPriceDesc = (page,limit = 12)=>{
    return models.product.findAll({
        order: [["price", "DESC"]],
        limit: limit,
        offset: page * limit
    },
    {
        raw: true
    })
}

exports.filterNewest = (page,limit=12)=>{
    return models.product.findAll({
        order: [["product_id", "DESC"]],
        limit: limit,
        offset: page * limit
    },{
        raw: true
    })
}
