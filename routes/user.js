var express = require("express")
var userController = require('../controllers/userController')
var passport = require('passport')

var router = express.Router();

router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/user/dashboard', failureRedirect: '/user' }))
router.get('/dashboard', userController.dashboard)
router.get('/logout', userController.logout)
router.post('/addprojects', userController.addProjects)
router.get('/viewprojects', userController.viewProjects)
router.get('/getprojectdetails', userController.getProjectDetails)
router.post('/updateproject', userController.updateProject)

module.exports = router;