const express = require('express');
const mongoose = require('mongoose');
const cookieSession = require('cookie-session');
const passport = require('passport');
const keys = require('./config/keys');
require('./models/User');
require('./services/passport');
const authRoutes = require('./routes/authRoutes');


mongoose.connect(keys.mongoURI);
const app = express();

// creating Cookie
app.use(
    cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000, //30days 24hrs 60min 60sec & 1000 millisecond
        keys: [keys.cookieKey]
    })
);

app.use(passport.initialize());
app.use(passport.session());

authRoutes(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT);