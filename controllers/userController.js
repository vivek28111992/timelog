/*
var helpers = require('../helpers/utils')
var User = require('../model/userModel')
*/
var url = require('url')

// login function
var login = function (req, res) {
	var hostname = req.headers.host
	//render login page
	res.render('login.ejs', { hostname: hostname})
}

// dashboard function
var dashboard = function (req, res){
	// if logged in reedirect to dashboard else to login
	if (req.session.passport) {
	  res.render('dashboard.ejs')
	} else {
	  res.render('login.ejs')
	}
}

// logout function
var logout = function(req, res){
	// Destroy session
	req.session.destroy(function (err) {
		if(err){
			// if error in destroying session throw err
			res.render('dashboard.ejs')
		}
		else{
			// redirect to home page of user
    	res.redirect('/user')
		}
  })
}

// add project of user
var addProjects = function(req, res){
	// if passport session is set 
	if (req.session.passport) {
		let projectName = req.body.projectname, startTime = req.body.starttime, endTime = req.body.endtime
		console.log(projectName, startTime, endTime)
	}
	else{
		res.redirect('/user/dashboard')
	}
}

module.exports = {
  login: login,
  dashboard: dashboard,
  logout: logout,
  addProjects : addProjects
}