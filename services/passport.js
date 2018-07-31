const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose');
const keys = require('../config/keys');
const User = mongoose.model('users');

// SerializeUser
passport.serializeUser((user, done) => {
    done(null, user.id); // this is the user id which is from the mongodb.       
});

// DeserilizeUser 
passport.deserializeUser((id, done) => {
    User.findById(id)
        .then(user => {
            done(null, user);
        });
});

passport.use(new GoogleStrategy({
    clientID: keys.googleClientID,
    clientSecret: keys.googleClientSecret,
    callbackURL: '/auth/google/callback'
}, (accessToken, refreshToken, profile, done) => {

    // search db for existing user
    User.findOne({
            googleId: profile.id
        })
        .then((existingUser) => {
            if (existingUser) {
                // we have a user already
            } else {
                //  create a new user
                new User({
                        googleId: profile.id
                    }) //creates a mongoose model instace/ new record
                    .save() // save the instances
                    .then(user => done(null, user));
            }
        })
}));