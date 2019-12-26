var request = require('request');
var crypto = require('crypto');
var bcrypt = require('bcrypt-nodejs');
var util = require('../lib/utility');

var db = require('../app/config');
var User = require('../app/models/user');
var Link = require('../app/models/link');

exports.renderIndex = function (req, res) {
  res.render('index');
};

exports.signupUserForm = function (req, res) {
  res.render('signup');
};

exports.loginUserForm = function (req, res) {
  res.render('login');
};

exports.logoutUser = function (req, res) {
  req.session.destroy(function () {
    res.redirect('/login');
  });
};

exports.fetchLinks = function (req, res) {
  new Link({}).getAll().then((links) => {
    res.status(200).send(links);
  });
};

exports.saveLink = function (req, res) {
  var uri = req.body.url;

  if (!util.isValidUrl(uri)) {
    console.log('Not a valid url: ', uri);
    return res.sendStatus(404);
  }
  var link = new Link({ url: uri });
  link.find()
    .then(found => {
      if (found) {
        res.status(200).send(found);
        throw found
        return;
      }
    })
    .then(() => {
      util.getUrlTitle(uri, function (err, title) {
        if (err) {
          console.error('Error reading URL heading: ', err);
          return res.sendStatus(404);
        }
        link._data.title = title;
        link._data.baseUrl = req.headers.origin;
        link.save()
          .then((newLink) => {
            res.status(200).send(newLink);
          })
      })
    })
    .catch(err => {
      console.error('Error in save link');
    });
};

exports.loginUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;

  let user = new User({ username: username });
  user.find()
    .then(result => {
      if (!result) {
        res.redirect('/login');
        return;
      }
      return result;
    })
    .then(userData => {
      user.comparePassword(password, userData.password, (match) => {
        if (match) {
          util.createSession(req, res, userData);
        } else {
          res.redirect('/login');
        }
      });
    })
};

exports.signupUser = function (req, res) {
  var username = req.body.username;
  var password = req.body.password;
  new User({ username, password })
    .save()
    .then(result => {
      console.log(result);
      util.createSession(req, res, result);
      res.json(result);
    })
    .catch(err => {
      res.redirect('/signup');
    })
};

exports.navToLink = function (req, res) {
  new Link({ code: req.params[0] }).update((err, found) => {
    if (!found) {
      res.redirect('/');
    } else {
      return res.redirect(found.url);
    }
  });
};