/**
 * Auth routes
 */

var express = require('express');
var router  = express.Router({mergeParams: true});

var passport = require('passport');
var User = require('../models/user');

// ROOT route
router.get('/', function(req, res) {
  res.render('landing');
});

// register form
router.get('/register', function(req, res) {
  res.render('register');
});

// register logic
router.post('/register', function(req, res) {
  var newUser = new User({ username: req.body.username });
  User.register(newUser, req.body.password, function(err, user) {
    if (err) {
      req.flash('err', err);
      return res.render('register');
    }
    passport.authenticate('local')(req, res, function() {
      req.flash('success', 'Welcome to Find.Eat.Drink.Repeat ' + user.username);
      res.redirect('/restaurants');
    });

  });
});
 

router.get('/login', function(req, res) {
  res.render('login');
});

// router.post('/login', middleware, callback)
router.post('/login', passport.authenticate('local', {
  successRedirect: '/restaurants',
  failureRedirect: '/login'
}), function(req, res) {
  // empty
});

router.get('/logout', function(req, res) {
  req.logout();
  req.flash('success', 'Logged you out!');
  res.redirect('/restaurants');
});

module.exports = router;