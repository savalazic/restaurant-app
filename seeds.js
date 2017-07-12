var mongoose = require('mongoose');
var Restaurant = require('./models/restaurant');
var Comment = require('./models/comment');

var data = [
  {
    name: 'Clouds Rest',
    image: 'https://farm9.staticflickr.com/8471/8137270056_21d5be6f52.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui modi, repellendus rem totam? Voluptas minima non tempore, iure architecto ea, esse eveniet magni vel suscipit molestiae sit inventore quasi delectus.'
  },
  {
    name: 'Desert Mesa',
    image: 'https://farm7.staticflickr.com/6188/6106475454_cf4dab4d64.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui modi, repellendus rem totam? Voluptas minima non tempore, iure architecto ea, esse eveniet magni vel suscipit molestiae sit inventore quasi delectus.'
  },
  {
    name: 'Canyon Floor',
    image: 'https://farm1.staticflickr.com/200/477903419_4fe5a5e827.jpg',
    description: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Qui modi, repellendus rem totam? Voluptas minima non tempore, iure architecto ea, esse eveniet magni vel suscipit molestiae sit inventore quasi delectus.'
  },
];

function seedDB() {
  // remove all campgrounds
  Restaurant.remove({}, function(err) {
    if (err) {
      console.log(err);
    }
    console.log('Removed restaurants');

    // add a few campgrounds
    data.forEach(function(seed) {
      Restaurant.create(seed, function(err, restaurant) {
        if (err) {
          console.log(err);
        } else {
          console.log('added a restaurant');
          // create a comment
          Comment.create({
            text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque ipsa reiciendis pariatur quisquam harum, sit blanditiis voluptatum doloremque eius, quia quam porro ullam totam aperiam veritatis illum non nam dolor.',
            author: 'Homer'
          }, function(err, comment) {
            if (err) {
              console.log(err);
            } else {
              restaurant.comments.push(comment);
              restaurant.save();
              console.log('created new comment');
            }
          });
        }
      });

    });

  });

  

}

module.exports = seedDB;

