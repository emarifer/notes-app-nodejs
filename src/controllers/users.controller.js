const passport = require('passport');

module.exports = {
    renderSignUpForm: (req, res) => {
        res.render('users/signup');
    },
    signup: passport.authenticate('local-signup', {
        failureRedirect: '/users/signup',
        failureFlash: true,
        successRedirect: '/notes'
    }),
    renderSignInForm: (req, res) => {
        res.render('users/signin');
    },
    signin: passport.authenticate('local-signin', {
        failureRedirect: '/users/signin',
        failureFlash: true,
        successRedirect: '/notes'
    }),
    logout: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out now.');
        res.redirect('/users/signin');
    }
};