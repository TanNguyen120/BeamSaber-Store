const userService = require("./user_service");


exports.userProfile = async (req, res) => {
    if (!req.user) {
        res.status(404).render("error", { message: "you are not a authorize user" })
    }
    else {
        try {
            const userProfile = await userService.findUser(req.user.id);
            res.render("./user_profile/profile", { userProfile });
        }
        catch (err) {
            console.log("ERR while querying: " + err)
            throw err;
        }
    }
}

exports.updateProfile = async (req, res) => {
    const phoneNumber = req.body.phone;
    const address = req.body.address;
    const bankAccount = req.body.bankAccount;
    const id = req.user.id
    console.log('updating: ' + id + ' to ' + phoneNumber + ' ' + address + ' ' + bankAccount);
    try {
        const userprofile = await userService.updateUser(id, phoneNumber, address, bankAccount);
        res.render('./login_and_register/index');
        console.log('success update');
    } catch (err) {
        res.render('error', { message: "cant update your account" })
        console.log('error at update profile: ' + err.message);
        throw err;
    }
}