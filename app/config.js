var path = require('path');
// var knex = require('knex')({
//   client: 'sqlite3',
//   connection: {
//     filename: path.join(__dirname, '../db/shortly.sqlite')
//   },
//   useNullAsDefault: true
// });
// var db = require('bookshelf')(knex);

// db.knex.schema.hasTable('urls').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('urls', function (link) {
//       link.increments('id').primary();
//       link.string('url', 255);
//       link.string('baseUrl', 255);
//       link.string('code', 100);
//       link.string('title', 255);
//       link.integer('visits');
//       link.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// db.knex.schema.hasTable('users').then(function(exists) {
//   if (!exists) {
//     db.knex.schema.createTable('users', function (user) {
//       user.increments('id').primary();
//       user.string('username', 100).unique();
//       user.string('password', 100);
//       user.timestamps();
//     }).then(function (table) {
//       console.log('Created Table', table);
//     });
//   }
// });

// module.exports = db;
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
var Schema = mongoose.Schema;
var url = "mongodb+srv://root:toor@cluster0-qa2yn.mongodb.net/test";
const uri = "mongodb://root:toor@cluster0-qa2yn.mongodb.net/test?retryWrites=true&w=majority";
mongoose.connect(url, { useMongoClient: true });
// mongoose.connect('mongodb://localhost/test')

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   // const collection = client.db("test").collection("devices");
//   // // perform actions on the collection object
//   // client.close();
//   console.log("we're connected!")
// });

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!")
});
var urls = new Schema({
  url: String,
  baseUrl: String,
  code: String,
  title: String,
  visits: Number,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

var users = new Schema({
  username: { type: String, unique: true },
  password: String,
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now }
});

module.exports.url = urls;
module.exports.user = users;