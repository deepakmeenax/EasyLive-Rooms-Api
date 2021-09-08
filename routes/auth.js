const express = require('express');
const { OAuth2Client } = require('google-auth-library');
const jwt = require('jsonwebtoken');
const User = require('../models/user')

const router=express.Router()

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

router.post('/googlelogin', async (req, res) => {
  const { idToken } = req.body;
  try {
    const response= await client.verifyIdToken({idToken, audience: process.env.GOOGLE_CLIENT_ID});
    // console.log('GOOGLE LOGIN RESPONSE',response)
    const { email_verified, name, email, picture } = response.payload;
    if (email_verified) {
      const user= await User.findOne({ email });
        if (user) {
          console.log('find user', user);
          const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {expiresIn: '7d'});
          const { _id, email, name } = user;
          return res.json({
            token,
            user: { _id, email, name}
          });
        } else {
          let password = email + process.env.JWT_SECRET;
          const user = new User({ name, email, password, image: picture });
          user.save((err, data) => {
            if (err) {
              console.log('ERROR GOOGLE LOGIN ON USER SAVE', err);
              return res.status(400).json({
                error: 'User signup failed with google'
              });
            }
            console.log('created user', data);
            const token = jwt.sign(
              { _id: data._id },
              process.env.JWT_SECRET,
              { expiresIn: '7d' }
            );
            const { _id, email, name } = data;
            return res.json({
              token,
              user: { _id, email, name}
            });
          });
        
      };
    } else {
      return res.status(400).json({
        error: 'Google login failed. Try again'
      });
    }
    
  } catch (error) {
    console.log(error);
  }

});


module.exports = router;