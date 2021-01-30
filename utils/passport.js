const GoogleStrategy = require('passport-google-oauth20').Strategy;
const mongoose = require('mongoose')

const User = require("../models/user");

module.exports = function(passport){

  passport.use(new GoogleStrategy({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: '/auth/google/redirect'
  },async (accessToken, refreshToken, profile, done) => {
      // passport callback function
      //check if user already exists in our db with the given profile ID
      User.findOne({googleId: profile.id}).then((currentUser)=>{
        if(currentUser){
          //if we already have a record with the given profile ID
          done(null, currentUser);
        } else{
          try {
            //if not, create a new user 
            new User({
              googleId: profile.id,
              name: profile.displayName,
              image: profile._json.picture,
              email: profile._json.email
            }).save().then((newUser) =>{
              done(null, newUser);
            });
          } catch (error) {
            console.log(error)
          }
         } 
      })
    })
  );


passport.serializeUser((user, done) => {
  done(null, user.id);
});
 
passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => done(err, user))
});


}