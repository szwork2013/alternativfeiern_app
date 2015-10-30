// server.js

// set up ======================================================================
// get all the tools we need
var express  = require('express');
var app      = express();
var port     = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');

var scheduler = require('./af_modules/scheduler.js');
scheduler.setupSchedule();

// configuration ===============================================================
mongoose.connect(configDB.url, {auth: {authdb: 'af_backend'}}); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.use(express.static('assets'));

app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
//app.engine('jsx', require('express-react-views').createEngine());

// required for passport
app.use(session({ secret: 'ilovescotchscotchyscotchscotch' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions


// routes ======================================================================
require('./routes.js')(app, passport); // load our routes and pass in our app and fully configured passport
// app.use((req, res, next) => {
//   match({
//     routes,
//     location: req.url
//   }, (error, redirectLocation, renderProps) => {
//     if (error) {
//       res.status(500).send(error.message);
//     } else if (redirectLocation) {
//       res.redirect(302, redirectLocation.pathname + redirectLocation.search);
//     } else if (renderProps) {
//       //res.status(200).send(ReactDom.renderToString(<RoutingContext {...renderProps} />));
//       var body = ReactDom.renderToString(<RoutingContext {...renderProps} />);
//       res.status(200).render('singlepage/layout', {
//         body : body,
//         title : 'DEV'
//       });
//     } else {
//       res.status(404).send('Not found');
//     }
//   });
// });

// launch ======================================================================
app.listen(port);
console.log('The magic happens on port ' + port);
