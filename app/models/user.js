var db = require('../config');
var bcrypt = require('bcrypt-nodejs');
var Promise = require('bluebird');
const mongoose = require('mongoose');

// var User = db.Model.extend({
//   tableName: 'users',
//   hasTimestamps: true,
//   initialize: function() {
//     this.on('creating', this.hashPassword);
//   },
//   comparePassword: function(attemptedPassword, callback) {
//     bcrypt.compare(attemptedPassword, this.get('password'), function(err, isMatch) {
//       callback(isMatch);
//     });
//   },
//   hashPassword: function() {
//     var cipher = Promise.promisify(bcrypt.hash);
//     return cipher(this.get('password'), null, null).bind(this)
//       .then(function(hash) {
//         this.set('password', hash);
//       });
//   }
// });

// module.exports = User;
class User {
  constructor(data) {
    this.model = mongoose.model('User', db.user);
    this._data = data;
  }

  generateHash() {
    let cipher = Promise.promisify(bcrypt.hash);
    return cipher(this._data.password, null, null).bind(this);
    // .then(function (hash) {
    //   this.set('password', hash);
    // });
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