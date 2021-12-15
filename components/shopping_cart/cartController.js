const product = require('../../models/product');
const cartService = require('./cartService');
const { models } = require("../../models");

//------------------------------------------------------------------------------------------------------------------

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
            // else we add new item into cart
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
            } else {
                await cartService.createCartItems(unAuthnId, productId, cost);
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
//------------------------------------------------------------------------------------------------------------------

exports.countCartItems = async (req, res, next) => {
    const cartID = req.session.unAuthUser;
    try {
        const itemsInCart = await cartService.countCartItems(cartID);
        res.locals.itemsNumber = itemsInCart.count;
        res.locals.itemsInCart = itemsInCart.rows;
        next();
    } catch (err) {
        res.render("error", { message: err.message });
        throw (err);
    }
}

//------------------------------------------------------------------------------------------------------------------

exports.viewCart = async (req, res) => {
    const cartID = req.session.unAuthUser;
    try {
        const itemsInCart = await cartService.countCartItems(cartID);
        const cart = await cartService.findCart(cartID);
        res.render("./shopping_cart/index", { itemsInCart, cart });
    } catch (err) {
        res.render("error", { message: err.message });
        throw err;
    }
}


exports.removeFromCart = async (req, res) => {
    const cartID = req.body.cartId;
    const productID = parseInt(req.body.itemId);
    if (!isNaN(productID)) {
        try {
            await cartService.deleteCartItem(cartID, productID);
            res.status(200).send("success remove items");
        } catch (err) {
            res.status(500).send("cant remove");
            throw err;
        }
    } else {
        res.status(400).send("bad request");
    }
}