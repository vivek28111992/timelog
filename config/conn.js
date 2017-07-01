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
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// connect to db
var metadb_uri = 'mongodb://admin:admin@1234@ds145302.mlab.com:45302/timelogdb'
//mongodb://<dbuser>:<dbpassword>@ds145302.mlab.com:45302/timelogdb

var mongo_opts = {};

if (process.env.NODE_ENV === 'production') {
    metadb_uri = process.env.MONGO_PROD
}

/*
	-  Create connection to our database define in metadb_uri with mongo_opts
*/
mongoose.connect(metadb_uri, mongo_opts, function() {
    console.log('Mongoose setup done');
});

var db_server = process.env.DB_ENV || 'primary';

// connected events
mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + metadb_uri);
  console.log('Connected to ' + db_server + ' DB!');
});

mongoose.connection.on('error', console.error.bind(console, 'MongoDB connection error:'))

mongoose.set('debug', (process.env.MONGOOSE_DEBUG == 'true')? true:false);