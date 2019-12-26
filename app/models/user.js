var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
const mongoose = require('mongoose');

class User {
  constructor(data) {
    this.model = mongoose.model('User', db.user);
    this._data = data;
  }

  generateHash() {
    let cipher = Promise.promisify(bcrypt.hash);
    return cipher(this._data.password, null, null).bind(this);
  }

  find() {
    return this.model.findOne({ username: this._data.username });
  }

  comparePassword(attemptedPassword, actualPassword, callback) {
    bcrypt.compare(attemptedPassword, actualPassword, function (err, isMatch) {
      callback(isMatch);
    });
  }

  save() {
    return this.generateHash().then((hash) => {
      this._data['password'] = hash;
      let user = new this.model(this._data);
      return user.save();
    });
  }
}

module.exports = User;