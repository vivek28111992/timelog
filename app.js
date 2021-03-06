const express = require('express');
const session = require('express-session')
const app = express()
const passport = require('passport')

const bodyParser = require("body-parser")
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs')
app.use(express.static('public'))

/*
Helmet helps you secure your Express apps by setting various HTTP headers. 
*/
const helmet = require('helmet');
app.use(helmet.xssFilter());

require('./config/passport.js')(passport)

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000*60*24 }, resave: true,
    saveUninitialized: true}))
app.use(passport.initialize())
app.use(passport.session())

/*
-Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
- Storing configuration in the environment separate from code.
- Install using "npm install dotenv --save"
- As early as possible in your application, require and configure dotenv.
*/
require('dotenv').load()
require('./config/conn.js')

/*
- Define the base route.
- Create the base.js file in routes folder
- Set the base routes to /api/ path
*/
const base_route = require('./routes/base')
app.use('/', base_route)

/*
- Node JS Application listen at port 3000
*/
app.listen(process.env.PORT, '0.0.0.0')
console.log('Server is running at port '+process.env.PORT+'....')