const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require('../models/user');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email });
    if (user) {
        return done(null, false, req.flash('error_msg', 'The email is already in use.'));
    } else {
        if (password !== req.body.confirm_password) {
            return done(null, false, req.flash('error_msg', 'Password do not match.'));
        }
        if (password.length < 4) {
            return done(null, false, req.flash('error_msg', 'Password must be at least 4 characters.'));
        }
        const newUser = new User({
            name: req.body.name,
            email,
            password
        });
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        req.flash('success_msg', 'You are registered.');
        return done(null, newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, passport, done) => {
    const user = await User.findOne({ email });
    if (!user) return done(null, false, req.flash('error_msg', 'User not found.'));
    const match = await user.matchPassword(passport);
    if (!match) return done(null, false, req.flash('error_msg', 'Incorrect Password.'));
    return done(null, user);
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
        done(err, user);
    });
});

/* 
    SOBRE EL USO DE OTRAS PROPIEDADES PARA GUARDAR EN LA DB CON PASSPORT, ADEMAS DEL EMAIL Y PASS:
    https://stackoverflow.com/questions/23726921/does-passportjs-localstrategy-allow-more-parameters-than-the-default-username-an
    FINALIDAD DE "passReqToCallback". VER:
    https://stackoverflow.com/questions/55605063/how-to-get-http-request-body-or-request-in-passport-localstrategy-callback
*/