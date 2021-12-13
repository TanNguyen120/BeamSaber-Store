const product = require('../../models/product');
const cartService = require('./cartService');
const { models } = require("../../models");


/**
 * creat a cart or add the product to exist cart
 *
 * @param {*} req url req whit product id and unAuthnId
 * @param {*} res response to client result
 */
exports.addToCart = async (req, res) => {

    const productId = req.body.productId;
    const unAuthnId = req.session.unAuthUser;

    try {
        // find info of product
        const product = await cartService.findItem(productId);
        const cost = parseFloat(product.price);

        // try to find or create cart model
        const [cart, create] = await cartService.createCart(unAuthnId, cost);

        // if there already a cart exist. Then we add product price to total cost and update it
        if (!create) {
            const newCost = parseFloat(cart.total_cost) + cost;
            await cartService.cartCostUpdate(cart.cart_id, newCost);

            // we need to find the cart items and update total cost, quantity if it exists
            const cartItem = await cartService.findCartItems(productId, unAuthnId);
            if (cartItem) {
                // update quantity of cart items
                const newQuantity = parseInt(cartItem.quantity) + 1;
                const newCost = parseFloat(cartItem.total_cost) + cost;

                const updateCartItem = await cartService.updateQuantity(
                    productId,
                    unAuthnId,
                    newQuantity,
                    newCost
                );

                console.log("updated: " + JSON.stringify(updateCartItem));
            }
            // if it doesn't exist we create a new cart item 
        } else {
            await cartService.createCartItems(unAuthnId, productId, cost);
        }
        res.send("adding item to cart");


    } catch (err) {
        res.send("error: " + err);
        throw (err);

    }
}