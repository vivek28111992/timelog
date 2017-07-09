var express = require("express")
var adminController = require('../controllers/adminController')
var passport = require('passport')

var router = express.Router();

router.get('/', adminController.loginadmin)
router.post('/login', adminController.login)
router.get('/logout', adminController.logout)
router.get('/dashboard', adminController.checkSession, adminController.dashboard)
router.get('/getallusers', adminController.getAllUsers)
router.get('/getprojectdetails', adminController.getProjectDetails)
module.exports = router;