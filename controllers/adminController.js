/*var crypto = require('crypto')
var helpers = require('../helpers/utils')
var User = require('../model/userModel')
var async = require('async')

// admin login function
var login = function (req, res) {
	var sess = req.session
	var password = req.body.pass;
	var email = req.body.email;

	var salt = process.env.ADMIN_SALT
	var admin_email = process.env.ADMIN_EMAIL
	var admin_hash = process.env.ADMIN_PASS
	var hash = crypto.createHmac("sha512", salt).update(password).digest("hex");
	if(hash === admin_hash && email === admin_email){
		sess.views=1
		console.log("Login Success")
	  res.redirect('dashboard')
	  } else {
	  	sess.err_msg="Invalid Credentials";
	  	res.redirect('back')
	  }
}

// load admin login page
var loginadmin = function (req, res){
	var sess = req.session

	  if (sess.views) {
	  	res.redirect(process.env.ROOT_URL+'admin/dashboard')
	  } else {
	  	var err_msg = sess.err_msg
	  	var root_url = process.env.ROOT_URL
	  	delete req.session.err_msg
	  	res.render('admin/login.ejs',{err_msg:err_msg,root_url:root_url})
	  }
}

// check session
var checkSession = function(req, res, next){

	var sess = req.session
	if(sess.views || req.session.passport){
		next();	
	}else{
		res.redirect(process.env.ROOT_URL+'admin')
	}
}

var getAllUsers = function(req, res){
	User.find({}, function(err, userCB){
  		if(err){
  			err = err
  		}
  		else if(userCB.length === 0){
  			//err = 'No relavant data found'
  			var root_url = process.env.ROOT_URL
  			res.render('admin/allUsers.ejs', {data: userCB, root_url: root_url})
  		}
  		else{

  			var root_url = process.env.ROOT_URL
  			res.render('admin/allUsers.ejs', {data: userCB, root_url: root_url})
  		}
  	})
}

var dashboard = function (req, res){
	//console.log("Session_dash: %j", req.session)
	res.locals.user = req.user
	var sess = req.session
	  if (sess.views || req.session.passport) {
			var err_section = sess.section;
			delete req.session.section
	  	var root_url = process.env.ROOT_URL

	  	notificationCrtl.notificationCount().then(function(notifyCount) {
		  	res.render('admin/index.ejs',{root_url:root_url,err_section:err_section,notification_count:notifyCount})
			}, function(err) {
			  res.render('admin/index.ejs',{root_url:root_url,err_section:err_section,notification_count:0})
			})
	  } else {
	  	res.redirect(process.env.ROOT_URL+'admin')
	  }
}


var logout = function(req, res){
	req.session.destroy();
	req.logout()
	res.redirect(process.env.ROOT_URL+'admin')
}

module.exports = {
  login: login,
  checkSession:checkSession,
  dashboard: dashboard,
  logout: logout,
  loginadmin: loginadmin,
  getAllUsers:getAllUsers
}*/