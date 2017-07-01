//var passport = require('passport')
/*var User = require('../model/userModel')
var FacebookStrategy = require('passport-facebook').Strategy

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

  // Facebook
  passport.use(new FacebookStrategy({
    clientID: '673401752855527',
    clientSecret: '80ee8b9567ccd939066f54f14d5ca190',
    callbackURL: "http://localhost:3000/admin/auth/facebook/callback",
    profileFields: ['id', 'emails', 'displayName', 'name', 'gender', 'photos']
  },
  function(accessToken, refreshToken, profile, done) {
    //console.log(profile.emails[0].value)
    User.findOne({ email: profile.emails[0].value }, function(err, user) {
      if (err) { 
        return done(err) 
      }
      else if(user === null){
        //console.log(profile)
        var email = profile.emails[0].value
        var first_name = (profile.name.givenName)? profile.name.givenName : ""
        var last_name = (profile.name.familyName)? profile.name.familyName : ""
        var signup_type = profile.provider
        var profile_img = (profile.photos[0])? profile.photos[0].value : ""
        var account_handle = profile.displayName.replace(/ +/g, "")
        var gender = profile.gender

        // create a new user
        var newUser = User({
          first_name:first_name,
          last_name: last_name,
          signup_type: signup_type,
          profile_pic:{ photo1: profile_img },
          email_verified: true,
          account_handle: account_handle,
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
        return done(null, user)
      }
    })
  }
  ))
}	*/