const { v4: uuidv4 } = require('uuid')



module.exports = (req, res, next) => {
    // if user is not logging and this is the fist time their enter the website 
    // then we will set a unique id for them with uuid module
    if (!req.session.unAuthUser) {
        req.session.unAuthUser = uuidv4();
    }
    next();
}