const passport = require('passport');
const { prefix } = require('../helpers/prefixer');

module.exports = {
    renderSignUpForm: (req, res) => {
        res.render('users/signup');
    },
    signup: passport.authenticate('local-signup', {
        failureRedirect: `${prefix()}/users-signup`,
        failureFlash: true,
        successRedirect: `${prefix()}/notes`
    }),
    renderSignInForm: (req, res) => {
        res.render('users/signin');
    },
    signin: passport.authenticate('local-signin', {
        failureRedirect: `${prefix()}/users-signin`,
        failureFlash: true,
        successRedirect: `${prefix()}/notes`
    }),
    logout: (req, res) => {
        req.logout();
        req.flash('success_msg', 'You are logged out now.');
        res.redirect(`${prefix()}/users-signin`);
    }
};