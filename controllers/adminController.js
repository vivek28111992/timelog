var crypto = require('crypto')
var helpers = require('../helpers/utils')
var User = require('../model/userModel')

// admin login function
var login = function (req, res) {
	var sess = req.session
	var password = req.body.password;
	var email = req.body.email;

	var salt = process.env.ADMIN_SALT
	var admin_email = process.env.ADMIN_EMAIL
	var admin_hash = process.env.ADMIN_PASS
	var hash = crypto.createHmac("sha512", salt).update(password).digest("hex")
	if(hash === admin_hash && email === admin_email){
		sess.views=1
	  res.redirect('/admin/dashboard')
	  } else {
	  	sess.err_msg="Invalid email or password";
	  	res.redirect('back')
	  }
}

// load admin login page
var loginadmin = function (req, res){
	var sess = req.session

	  if (sess.views) {
	  	res.redirect('admin/dashboard')
	  } else {
	  	var err_msg = sess.err_msg
	  	delete req.session.err_msg
	  	res.render('admin/login.ejs',{err_msg:err_msg})
	  }
}

// check session
var checkSession = function(req, res, next){

	var sess = req.session
	if(sess.views){
		next();	
	}else{
		res.redirect('/admin')
	}
}

// get the name fo all users
var getAllUsers = function(req, res){
	User.find({}).select({'email':1, 'first_name':1, 'last_name':1}).exec(function(err, userData){
	  if(err){
	  	helpers.sendJsonResponse(res, 200, 2, err)
	  }
	  else if(userData.length === 0){
	  	helpers.sendJsonResponse(res, 200, 1, "No user found")
	  }
	  else{
	  	helpers.sendJsonResponse(res, 200, -1, userData)
	  }
	})
}

//dashboard function
var dashboard = function (req, res){
	//console.log("Session_dash: %j", req.session)
	res.locals.user = req.user
	var sess = req.session
	  if (sess.views) {
			res.render('admin/dashboard.ejs')
	  } else {
	  	res.redirect('/admin')
	  }
}

//logout function
var logout = function(req, res){
	req.session.destroy()
	req.logout()
	res.redirect('/admin')
}

// get project of user
var getProjectDetails = function(req, res){
	// check if user is loggedin
	var sess = req.session
	if(sess.views){
		//user logged in
		var email = req.query.email
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
		res.redirect('/admin')
	}
}

module.exports = {
  login: login,
  checkSession:checkSession,
  dashboard: dashboard,
  logout: logout,
  loginadmin: loginadmin,
  getAllUsers:getAllUsers,
  getProjectDetails: getProjectDetails
}