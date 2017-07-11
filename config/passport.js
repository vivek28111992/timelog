var passport = require('passport')
var User = require('../model/userModel')
var FacebookStrategy = require('passport-facebook').Strategy

var mongoose = require('mongoose') // For Mongoose

module.exports = function(passport){	

  // used to serialize the user
  passport.serializeUser(function(user, done) {
    done(null, user.id)
  })

  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user)
    })
  })

  // Facebook authentication
  passport.use(new FacebookStrategy({
    clientID: '1404883649558271',
    clientSecret: 'b5ca5c0d7097d8171090cd1d0f778003',
    callbackURL: "https://bagged-sorry-40388.herokuapp.com/user/auth/facebook/callback",
    profileFields: ['id', 'emails', 'displayName', 'name', 'gender', 'photos'],
    enableProof: true
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile.emails[0].value)
    User.findOne({"email":profile.emails[0].value}, function(err, user) {
      if (err) { 
        console.log('Error')
        return done(err) 
      }
      else if(user === null){
        var email = profile.emails[0].value
        var first_name = (profile.name.givenName)? profile.name.givenName : ""
        var last_name = (profile.name.familyName)? profile.name.familyName : ""
        var profile_img = (profile.photos[0])? profile.photos[0].value : ""
        var gender = profile.gender

        // create a new user
        var newUser = User({
          first_name:first_name,
          last_name: last_name,
          profile_pic: profile_img,
          gender: gender,
          email:email
        })

        // save the user
        newUser.save(function(err, newuser) {
          if(err) return done(err)
          return done(null, newuser)
        })
      }
      else{
        console.log('User found')
        return done(null, user)
      }
    })
  }
  ))
}	