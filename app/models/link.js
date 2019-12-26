var db = require('../config');
var crypto = require('crypto');
const mongoose = require('mongoose');

class Link {
  constructor(data) {
    this.model = mongoose.model('Link', db.url);
    this._data = data;
  }

  generateCode(url) {
    var shasum = crypto.createHash('sha1');
    shasum.update(url);
    return shasum.digest('hex').slice(0, 5);
  }

  find() {
    return this.model.findOne({ url: this._data.url });
  }

  getAll() {
    return this.model.find({});
  }

  save() {
    this._data['code'] = this.generateCode(this._data.url);
    let link = new this.model(this._data);
    return link.save();
  }
}

module.exports = Link;