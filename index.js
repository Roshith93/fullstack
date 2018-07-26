const express = require('express');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const keys = require('./config/keys');

const app = express();

// Route Handler

// app.get('/', (req,res)=>{
//   res.send({hi:'there', message : "Fuck you bitch"});

// });

passport.use(new GoogleStrategy({
  clientID: keys.googleClientID,
  clientSecret: keys.googleClientSecret,
  callbackURL: '/auth/google/callback'
}, (accessToken,refreshToken,profile,done) => {
  console.log('access token',accessToken);
  console.log('refresh token',refreshToken);
  console.log('profile',profile);
}));

// route handler for google auth
app.get('/auth/google', passport.authenticate('google',{
  scope : ['profile', 'email']
}));

// Call back url route handler
app.get('/auth/google/callback', passport.authenticate('google'));

const PORT = process.env.PORT || 5000;
app.listen(PORT);