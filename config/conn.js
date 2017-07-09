/*
Opening and closing connections to databases can take a little bit of time,
especially if your database is on a separate server or service.
The best practice is to open the connection when your application starts up,
and to leave it open until your application restarts or shuts down.

This module only does the work of managing mongoDB connection
*/

var metadb = {};

/*
 - Include mongoose in our project and open a connection to the database on our locally running instance of MongoDB.
 - Mongoose provides a straight-forward, schema-based solution to model your application data.
 - It includes built-in type casting, validation, query building, business logic hooks and more, out of the box.
 - MongoDB has a flexible schema that allows for variability between different documents in the same collection. 
*/
const MongoClient = require('mongodb').MongoClient;
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connect to db
var metadb_uri = 'mongodb://admin:admin@ds145892.mlab.com:45892/timelog'

var mongo_opts = {};

if (process.env.NODE_ENV === 'production') {
    metadb_uri = process.env.MONGO_PROD
}

var db_server = process.env.DB_ENV || 'primary';

// connected events
mongoose.connect(metadb_uri, (err, database) => {
  if (err) return console.log(err)
  console.log("connected to db")	
})

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

mongoose.set('debug', (process.env.MONGOOSE_DEBUG == 'true')? true:false);