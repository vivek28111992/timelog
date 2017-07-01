var express = require('express');
var session = require('express-session')
var app = express()
var server = require('http').createServer(app)
var passport = require('passport')

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json());
app.set('view engine', 'ejs');
app.use(express.static('public'))

/*
Helmet helps you secure your Express apps by setting various HTTP headers. 
*/
var helmet = require('helmet');
app.use(helmet.xssFilter());

//require('./config/passport.js')(passport)

app.use(session({ secret: 'keyboard cat', cookie: { maxAge: 60000*60*24 }}))
app.use(passport.initialize())
app.use(passport.session())
//require('./routes/routes')(app);

/*
-Dotenv is a zero-dependency module that loads environment variables from a .env file into process.env. 
- Storing configuration in the environment separate from code.
- Install using "npm install dotenv --save"
- As early as possible in your application, require and configure dotenv.
*/
require('dotenv').load();
require('./config/conn.js');

/*
- Define the base route.
- Create the base.js file in routes folder
- Set the base routes to /api/ path
*/
//var base_route = require('./routes/base')
//app.use('/', base_route)

/*
- Node JS Application listen at port 3000
*/
server.listen(process.env.NODE_SERVER_PORT);
console.log('Server is running at port '+process.env.NODE_SERVER_PORT+'....');