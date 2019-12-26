var path = require('path');
const mongoose = require('mongoose');

var Schema = mongoose.Schema;
var url = "mongodb+srv://root:toor@cluster0-qa2yn.mongodb.net/test";
var db = mongoose.connection;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true });

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function () {
  console.log("we're connected!")
});

var urls = new Schema({
  url: { type: String, unique: true },
  baseUrl: String,
  code: String,
  title: String,
  visits: { type: Number, default: 0 },
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