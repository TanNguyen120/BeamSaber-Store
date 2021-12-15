const { models } = require("../../models");
const { Op } = require("sequelize");


/**
 * Use for find an item with given id
 *
 * @param {*} id
 * @return {*} raw data of an object with matching id
 */
exports.findItem = (id) => {
    console.log("finding item with id= " + id);
    //find item with matching id ( primary key ) with findPK function
    return models.product.findByPk(id, { raw: true });
};

exports.createCart = (unAuthnId, cost) => {

    return models.cart.findOrCreate(
        {
            where: { cart_id: unAuthnId },
            defaults: {
                cart_id: unAuthnId,
                total_cost: cost
            },

        });
}

exports.cartCostUpdate = (cartId, price) => {
    return models.cart.update(
        {
            total_cost: price
        },
        {
            where: { cart_id: cartId }
        }
    );
}


exports.createCartItems = (cartId, productID, price) => {
    return models.cart_items.create(
        {
            cart_id: cartId,
            product_id: productID,
            total_cost: price,
            quantity: 1
        }
    )
}

exports.findCartItems = (productId, cartID) => {
    return models.cart_items.findOne({
        where: {
            cart_id: cartID,
            product_id: productId
        }, raw: true
    }
    );
}


exports.updateQuantity = (productId, cartID, newQuantity, newCost) => {
    return models.cart_items.update(
        {
            quantity: newQuantity,
            total_cost: newCost

        },
        {
            where:
            {
                product_id: productId,
                cart_id: cartID
            }
        }
    )
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