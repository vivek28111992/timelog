var express = require('express');
var router = express.Router();

//load helpers
var helpers=require('../helpers/utils')

//load the abstract routes
var user = require('./user');
var admin = require('./admin');

// A middleware sub-stack shows request info for HTTP request to the /device-registration path
router.use('/user', user);
router.use('/admin', admin);

/* 	'module' is a variable that represents current module and exports is an object that will be exposed as a module. 
	So, whatever you assign to module.exports, will be exposed as a module.
*/
module.exports = router