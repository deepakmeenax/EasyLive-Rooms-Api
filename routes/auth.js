const express = require('express');
const passport = require('passport');

const {ensureGuest}= require('../middleware/checkauth')

const router=express.Router()

// auth with google+
router.get("/auth/google", passport.authenticate("google", 
    {scope: ["profile", "email"]
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get("/auth/google/redirect", passport.authenticate('google'), (req, res) =>{
    res.redirect('/profile')
});

//auth login
router.get('/login', ensureGuest, (req, res) => {
    res.send('you are in login page...!')
});

// auth logout
router.get('/logout', (req, res) => {
    req.logout();
    res.send('you are logout ....!');
});

module.exports = router