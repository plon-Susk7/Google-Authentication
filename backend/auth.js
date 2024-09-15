const dotenv = require('dotenv')
var GoogleStrategy = require('passport-google-oauth20').Strategy;

dotenv.config()


function initPassport() {
  
    passport.use(new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: "http://localhost:3000/auth/google/callback"
      },

      function(accessToken, refreshToken, profile, cb) {
        User.findOrCreate({ googleId: profile.id }, function (err, user) {
          return cb(err, user);
        });
      }
    ));
  
  
    passport.serializeUser(function (user, cb) {
      process.nextTick(function () {
        return cb(null, {
          id: user.id,
          username: user.username,
          picture: user.picture,
        });
      });
    });
  
    passport.deserializeUser(function (user, cb) {
      process.nextTick(function () {
        return cb(null, user);
      });
    });
}

module.exports = {initPassport}