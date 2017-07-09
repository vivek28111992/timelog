var helpers = require('../helpers/utils')
var User = require('../model/userModel')

var url = require('url')

// login function
var login = function (req, res) {
	var hostname = req.headers.host
	//render login page
	res.render('login.ejs', { hostname: hostname})
}

// dashboard function
var dashboard = function (req, res){
	req.session.email = req.user.email
	//console.log(req.user)
	// if logged in redirect to dashboard else to login
	if (req.session.passport) {
		// render dashboard page with user data
	  res.render('dashboard.ejs', {userdata: req.user})
	} else {
		// redirect to login page
	  res.redirect('/')
	}
}

// logout function
var logout = function(req, res){
	// Destroy session
	req.session.destroy(function (err) {
		if(err){
			// if error in destroying session
			res.render('dashboard.ejs')
		}
		else{
			// redirect to home page of user
    	res.redirect('/')
		}
  })
}

// add project of user
var addProjects = function(req, res){
	// if passport session is set 
	if (req.session.passport) {
		// user loggedin
		var projectName = req.body.projectname, startTime = req.body.starttime, endTime = req.body.endtime, email = req.body.email
		User.findOneAndUpdate({"email":email}, 
			{$push: { project: {"name": projectName, "starttime": startTime, "endtime": endTime}}},
			function(err, docs){
				if(err){
					// Mongodb error
					helpers.sendJsonResponse(res, 400, 2, err)
				}
				else if(docs === null) {
					// user not found with that email
					helpers.sendJsonResponse(res, 200, 1, "User not found")
				}
				else{
					// projects timings added
					helpers.sendJsonResponse(res, 200, -1, "Project Timings added successfully.")
				}
			})
	}
	else{
		// user not loggedin
		res.redirect('/')
	}
}

var viewProjects = function (req, res){
	// check if user is loggedin
	if(req.session.passport){
		//user logged in
		let email = req.session.email
		User.findOne({"email": email}, function(err, userDocs){
			if (err) {
				res.render('projects.ejs', {data: err})
			}
			else if (userDocs === null) {
				res.render('projects.ejs', {data: "Sorry! User not found"})
			}
			else{
				res.render('projects.ejs', {data: userDocs})
			}
		})
	}
	else{
		// user not loggedin
		res.redirect('/')
	}
}

var getProjectDetails = function(req, res){
	// check if user is loggedin
	if(req.session.passport){
		//user logged in
		let email = req.session.email
		User.findOne({"email": email}, function(err, userDocs){
			if (err) {
				helpers.sendJsonResponse(res, 400, 2, err)
			}
			else if (userDocs === null) {
				helpers.sendJsonResponse(res, 200, 1, "User not found")
			}
			else{
				helpers.sendJsonResponse(res, 200, -1, userDocs.project)
			}
		})
	}
	else{
		// user not loggedin
		res.redirect('/')
	}
}

var updateProject = function(req, res){
	if (req.session.passport) {
		// user loggedin
		var projectName = req.body.projectname, startTime = req.body.starttime, endTime = req.body.endtime
		var projectid = req.body.projectid, email = req.session.email
		User.findOneAndUpdate({"email":email, "project._id": projectid}, 
			{$set: { "project.$": {"name": projectName, "starttime": startTime, "endtime": endTime}}},
			function(err, docs){
				if(err){
					// Mongodb error
					helpers.sendJsonResponse(res, 400, 2, err)
				}
				else if(docs === null) {
					// user not found with that email
					helpers.sendJsonResponse(res, 200, 1, "User not found")
				}
				else{
					// projects timings added
					helpers.sendJsonResponse(res, 200, -1, "Project Timings updated successfully.")
				}
		})
	}	
	else{
		res.redirect('/')
	}
}

module.exports = {
  login: login,
  dashboard: dashboard,
  logout: logout,
  addProjects : addProjects,
  viewProjects: viewProjects,
  getProjectDetails: getProjectDetails,
  updateProject: updateProject
}