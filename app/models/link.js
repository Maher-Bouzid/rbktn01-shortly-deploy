var db = require('../config');
var crypto = require('crypto');
const mongoose = require('mongoose');

// var Link = db.Model.extend({
//   tableName: 'urls',
//   hasTimestamps: true,
//   defaults: {
//     visits: 0
//   },
//   initialize: function() {
//     this.on('creating', function(model, attrs, options) {
//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
//     });
//   }
// });


// Define CRUD methods
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

  save() {
    this._data['code'] = generateCode(this._data.url);
    let link = new this.model(this._data);
    return link.save();
  }
}
// new Link({})

//       var shasum = crypto.createHash('sha1');
//       shasum.update(model.get('url'));
//       model.set('code', shasum.digest('hex').slice(0, 5));
module.exports = Link;