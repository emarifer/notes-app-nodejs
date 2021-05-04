const { Router } = require('express');
const router = Router();
const {
    renderSignUpForm,
    signup,
    renderSignInForm,
    signin,
    logout
} = require('../controllers/users.controller');

// New User
router.get('/users/signup', renderSignUpForm);

// SignUp
router.post('/users/signup', signup);

// Login Form
router.get('/users/signin', renderSignInForm);

// Logining
router.post('/users/signin', signin);

// Logout
router.get('/users/logout', logout);

module.exports = router;