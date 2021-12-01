const mainPageService = require("./mainPageService");

exports.advertiseProduct = async (req, res, next) => {
    const newestProduct = await mainPageService.lastProducts(0,8).catch((err)=>{
        console.log(err);
        throw(err);
    });
    res.render("index",{newestProduct});
}
