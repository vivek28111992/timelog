'use strict'

var mongoose = require('mongoose') // For Mongoose

// Schema
var userSchema = new mongoose.Schema({
  first_name :{type: String},
  last_name :{type: String},
  email:{type: String,unique:true},
  password : {type: String},
  profile_pic: {type: String},
  gender :{type: String},
  project: [{
    name: {type: String},
    starttime: {type: Number},
    endtime: {type: Number}
 }]
},{versionKey:false})

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('users', userSchema)

// make this available to our users in our Node applications
module.exports = User