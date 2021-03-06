const passport = require('passport');

module.exports = (app) => {

    // route handler for google auth
    app.get('/auth/google', passport.authenticate('google', {
        scope: ['profile', 'email']
    }));

    // Call back url route handler
    app.get('/auth/google/callback', passport.authenticate('google'));

    // Logout
    app.get('/api/logout', (req, res) => {
        req.logout();
        res.send(req.user);
    })

    // Authentication
    app.get('/api/current_user', (req, res) => {
        res.send(req.user);
    })

}