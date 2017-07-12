/**
 * Restaurants routes
 */

var express = require('express');
var router  = express.Router({mergeParams: true});

var Restaurant = require('../models/restaurant');
var Comment = require('../models/comment');

var middleware = require('../middleware');

// INDEX - show all restaurants
router.get('/', function(req, res) {

  // get all restaurants from db
  Restaurant.find({}, function(err, allRestaurants) {
    if (err) {
      console.log(err);
    } else {
      res.render('restaurants/index', { 
        restaurants: allRestaurants
      });
    }
  });
});

// CREATE - add new restaurant to DB
router.post('/', middleware.isLoggedIn, function(req, res) {
  // get data from form andd add to restaurants array
  var name = req.body.name;
  var image = req.body.image;
  var description = req.body.description;
  var workingTime = req.body.workingTime;
  var address = req.body.address;
  var email = req.body.email;
  var phone = req.body.phone;

  var author = {
    id: req.user._id,
    username: req.user.username
  }

  var newRestaurant = {
    name: name,
    image: image,
    description: description,
    author: author,
    phone: phone,
    email: email,
    address: address,
    workingTime: workingTime
  }

  // create a new restaurant and save to db
  Restaurant.create(newRestaurant, function(err, newlyCreated) {
    if (err) {
      console.log(err);
    } else {
      console.log(newlyCreated);
      res.redirect('/restaurants');
    }
  });

});

// NEW - show form to create new restaurant
router.get('/new', middleware.isLoggedIn, function(req, res) {
  res.render('restaurants/new');
});

// SHOW - more info about one restaurant
router.get('/:id', function(req, res) {
  // find restaurant with provided ID
  Restaurant.findById(req.params.id).populate('comments').exec(function(err, foundRestaurant) {
    if (err) {
      console.log(err);
    } else {
      // render show template with that restaurant
      res.render('restaurants/show', { restaurant: foundRestaurant });
    }
  });
});

// EDIT
router.get('/:id/edit', middleware.checkRestaurantOwnership, function(req, res) {
  Restaurant.findById(req.params.id, function(err, foundRestaurant) {
    res.render('restaurants/edit', {
      restaurant: foundRestaurant
    });
  });
});

// UPDATE
router.put('/:id', middleware.checkRestaurantOwnership, function(req, res) {
  // find and update the correct restaurant
  // then redirect
  Restaurant.findByIdAndUpdate(req.params.id, req.body.restaurant, function(err, updatedRestaurant) {
    if (err) {
      res.redirect('/restaurants');
    } else {
      res.redirect('/restaurants/' + req.params.id);
    }
  });
});

// DESTROY
router.delete('/:id', middleware.checkRestaurantOwnership, function(req, res) {
  Restaurant.findByIdAndRemove(req.params.id, function(err) {
    if (err) {
      res.redirect('/restaurants');
    } else {
      res.redirect('/restaurants');
    }
  });
});

module.exports = router;