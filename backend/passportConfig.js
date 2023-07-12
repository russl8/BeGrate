const User = require("./models/user")
const bcrypt = require("bcryptjs");
const LocalStrategy = require("passport-local").Strategy

module.exports = function (passport) {


    passport.use(
        new LocalStrategy(async (username, password, done) => {
          try {
            const user = await User.findOne({ username: username });
            if (!user) {
              return done(null, false);
            }
            const result = await bcrypt.compare(password, user.password);
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          } catch (err) {
            throw err;
          }
        })
      );
      


    passport.serializeUser((user, cb) => {
        cb(null, user.id)
    })

    passport.deserializeUser((id, cb) => {
        User.findOne({ _id: id }, (err, user) => {
            cb(err, user)
        })
    })
}//end of module exports