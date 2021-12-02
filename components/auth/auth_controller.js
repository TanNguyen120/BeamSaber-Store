const bcrypt = require('bcrypt');
const authService = require("./auth_service")




/*Register controller will sanitize the req body before creating object*/
exports.registerUser = async function (req, res) {
    const { name, password, email } = req.body;
    // check if all the values are fill
    if (!name || !password || !email) {
        res.render("./login_and_register/index", { message: "please fill in the name and password and email" })
    }
    else {
        console.log(name, password, email);
        try {
            // if email is already use respond error
            const user = await authService.findEmail(email);
            if (user) {
                res.render("./login_and_register/index", { message: "your email is already in use" });
                throw new Error("duplicate email")
            }
            else {
                console.log("creating account");
                // hashing password before create 
                const hashPassword = await bcrypt.hash(password, 5);
                // auto generated id for user
                const lastId = await authService.lastUser();
                const newId = lastId.id + 1;
                try {
                    // CREATE USER CODE HERE
                    const newUser = await authService.createUser(newId, name, email,hashPassword);
                    res.render("./login_and_register/index", { message: "success register" })
                } catch (err) {
                    res.render("./login_and_register/index", { message: "cant register" })
                    throw err;
                }
            }
        } catch (err) {
            res.render("/login_and_register/index", { message: "some thing wrong happen" });
            console.error(err);
            throw err;
        }
    }
}