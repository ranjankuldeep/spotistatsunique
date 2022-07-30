const passport = require("passport");
const SpotifyStrategy = require("passport-spotify").Strategy;
const User = require("../Model/user");
require("dotenv").config();
const token=require('../Util/refreshtoken')
const clientID = process.env.CLIENTID;
const clientSecret = process.env.CLIENTSECRET;
const fs=require('fs');
const PORT=process.env.PORT || 3000;

passport.serializeUser(function (user, done) {

  done(null, user._id);
});

passport.deserializeUser(function (_id, done) {
  User.findById(_id)
    .then((user) => {
      done(null, user);
    })
    .catch((err) => console.log(err));
});

passport.use(
  new SpotifyStrategy(
    {
      clientSecret,
      clientID,
      callbackURL: "https://spotistatsunique.herokuapp.com/auth/login/spotify/redirect"
    },
    (AcessToken, RefreshToken, Profile, done) => {
      console.log(RefreshToken)
        fs.writeFile('./.spotify-token', AcessToken, (err) => {
            if (err) throw new Error('Failed to write Acess Token' + err);
        });
        fs.writeFile('./refresh_token',RefreshToken, (err) => {
            if (err) throw new Error('Failed to write Refresh Token' + err);
        })
      User.findOne({ spotifyId: Profile._json.id })
        .then((currentUser) => {
          if (currentUser) {

            done(null, currentUser);
          } else {
            new User({
              username: Profile._json.display_name,
              spotifyId: Profile._json.id,
            })
              .save()
              .then((newUser) => {
                done(null, newUser);
           
              })
              .catch((err) => console.log('here was the error'+err));
          }
        })
        .catch((err) => console.log(err));
    }
  )
);
