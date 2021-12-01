const passport = require('passport'), LocalStrategy = require('passport-local').Strategy;
// local strategy is a passport strategy that for authorization with local database information
const { models } = require("../../models");


// define strategy to local auth
passport.use(new LocalStrategy(
    // sequelize dont have callback methods so we have to use then catch
    function (username, password, done) {
        models.user.findOne({ where: { name: username } }).then(function (user) {
            /*When Passport authenticates a request, it parses the credentials contained in the request. 
            It then invokes the verify callback with those credentials as arguments, in this case username and password. 
            If the credentials are valid, the verify callback invokes done to supply Passport with the user that authenticated. */
            if (!user) {
                return done(null, false, { message: 'Incorrect username.' });
            }
            if (user.password != password) {
                return done(null, false, { message: 'Incorrect password.' });
            }
            console.log("found this user: " + JSON.stringify(user));
            return done(null, user);
        }).catch(
            //console.error(err);
            err => done(err)
            //throw err;
        );
    }
));

// for storing user data to session and not asking for login until next session
passport.serializeUser(function (user, done) {
    done(null, user.user_id);
    console.log("Serialize");
});

passport.deserializeUser(function (user_id, done) {
    console.log("deserializer")
    models.user.findByPk(user_id).then((user) => {
        console.log("Deserialized: " + JSON.stringify(user));
        if (user) {
            done(null, user.get());
        } else {
            done(user.errors, null);
        }
    });
});


module.exports = passport;