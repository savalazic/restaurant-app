var express        = require('express'),
    app            = express(),
    bodyParser     = require('body-parser'),
    mongoose       = require('mongoose'),
    passport       = require('passport'),
    LocalStrategy  = require('passport-local'),
    flash          = require('connect-flash'),
    methodOverride = require('method-override'),
    seedDB         = require('./seeds');

// seed the database
// seedDB();

// import routes
var commentRoutes    = require('./routes/comments');
var restaurantRoutes = require('./routes/restaurants');
var indexRoutes      = require('./routes/index');

// import models
var User = require('./models/user');
var Restaurant = require('./models/restaurant');
var Comment = require('./models/comment');

app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(flash());

mongoose.connect('mongodb://savalazic:savalazic@ds155582.mlab.com:55582/restaurantsapp');
// mongoose.connect('mongodb://localhost/restaurants');

// PASSPORT config
app.use(require('express-session')({
  secret: 'This is random secret',
  resave: false,
  saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// every route has access to currentUser
app.use(function(req, res, next){
  res.locals.currentUser = req.user;
  res.locals.error = req.flash('error');
  res.locals.success = req.flash('success');
  next();
});

app.use(indexRoutes);
app.use('/restaurants/:id/comments', commentRoutes);
app.use('/restaurants', restaurantRoutes);

app.listen(3000, function() {
  console.log('listening on 3000');
});