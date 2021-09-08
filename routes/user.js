const router = require('express').Router();


router.get('/profile', (req, res) => {
  res.send('You are in profile page....!')
});

module.exports = router
