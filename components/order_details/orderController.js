const orderService = require('./orderService');

exports.checkShippingInfo = async (req, res, next) => {
    if (!req.user) {
        res.redirect('/login');
        res.end();
    }
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
        const user = await orderService.findUser(userId);
        res.render("./order_details", { itemsInCart, cart, user });
    } catch (err) {
        res.render("error", { message: err.message });
        throw err;
    }
}