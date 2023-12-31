const router = require('express').Router();
const usersCtls = require('../controllers/users');
const { checkAuthenticated, checkNotAuthenticated } = require('../middleware');
const passport = require('passport');

module.exports = router
    .post('/signup',
        usersCtls.signup)
    .post('/login',
        checkAuthenticated,
        passport.authenticate('local'),
        usersCtls.login)
    .post('/logout',
        checkNotAuthenticated,
        usersCtls.logout)
    .get('/getusername',
        usersCtls.getLoggedInUser);
