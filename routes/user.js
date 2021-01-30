const router = require('express').Router();
const passport = require('passport');

const {ensureAuth}= require('../middleware/checkauth')

router.get('/profile', ensureAuth, (req, res) => {
  res.send('You are in profile page....!')
});

module.exports = router
