const orderService = require('./orderService');
const { v4: uuidv4 } = require('uuid')

exports.checkShippingInfo = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
        res.end();
    }
    // find user with user id in cookie
    const user = await orderService.findUser(req.user.id);
    if (user.phone === null & user.address === null) {
        res.redirect('/user/' + req.user.name + '/profile');
    }
    next();
}


exports.orderDetailPage = async (req, res) => {
    const cartId = req.session.unAuthUser;
    const userId = req.user.id;
    try {
        // count cart item is an eager load countAndFindAll function 
        const itemsInCart = await orderService.countCartItems(cartId);
        const cart = await orderService.findCart(cartId);
        // find user with given userId in cookie
        const user = await orderService.findUser(userId);
        res.render("./order_details", { itemsInCart, cart, user });
    } catch (err) {
        res.render("error", { message: err.message });
        throw err;
    }
}

exports.conformOrder = async (req, res) => {
    const cartId = req.session.unAuthUser;
    const userId = req.user.id;

    try {
        const cart = await orderService.findCart(cartId);
        // get the float number of total cost 
        const orderCost = cart.total_cost;
        // get a unique id with uuidv4
        const orderId = uuidv4();

        // get date of system
        const today = new Date();
        const orderDate = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();

        const newOder = await orderService.createOrder(orderId, userId, orderDate, orderCost);

        //update the order id to cart_items
        const newCartItems = await orderService.cartItemToOrderItems(orderId, cartId);



        res.send("ordering successfully");


    } catch (err) {
        res.send("fails some thing wrong happen: " + err.message);
        throw err;
    }
    res.send("we know: " + cartId + " " + userId);

}