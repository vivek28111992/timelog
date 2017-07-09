var express = require("express")
var userController = require('../controllers/userController')
var passport = require('passport')

var router = express.Router();

router.get('/', userController.login)
router.get('/auth/facebook', passport.authenticate('facebook', { scope : ['email'] }))
router.get('/auth/facebook/callback', passport.authenticate('facebook', { successRedirect: '/user/dashboard', failureRedirect: '/user' }))
router.get('/dashboard', userController.dashboard)
router.get('/logout', userController.logout)
router.post('/addProjects', userController.addProjects)

module.exports = router;