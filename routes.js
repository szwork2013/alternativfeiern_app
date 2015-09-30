const bodyParser = require('body-parser');

const auth = require('./config/auth');
const pm = require('./graphAPI/page_manager');
const em = require('./graphAPI/event_manager');
const PageController = require('./controller/page_controller');
const EventController = require('./controller/event_controller');
const LocationController = require('./controller/location_controller');
const FestivalController = require('./controller/festival_controller');
const newsletter = require('./af_modules/newsletter');
const Page = require('./models/fb_page');

pm.setAuthToken(auth.token);

const pagetitle = ' - Alternativ-Feiern';
// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE    ========================
    // =====================================
    app.get('/', function(req, res) {
        //em.getTodayWhitelisted(res, 'home/index', {title: 'Aktuelle Events'});
        res.render('home/index', {title: 'Aktuelle Events'});
    });

    app.get('/newsletter', function(req, res){
      res.render('home/newsletter', {title : 'Newsletter'});
    });

    app.post('/newsletter/subscribe', function(req, res){
      newsletter.subscribe(req, res);
    });

    app.get('/about', function(req, res) {
      res.render('home/about', {title : 'Über uns'});
    });

    app.get('/impressum', function(req, res) {
      res.render('home/impressum', {title : 'Impressum'});
    });

    app.get('/events/:eventId', function(req, res){
      var eventId = req.params.eventId;
      if(!isNaN(eventId)){
        EventController.get(eventId, res);
        //em.getSingle(eventId, res);
      } else {
        console.log('sth wrong with the parameter');
        res.send('eventId is not a number');
      }
    });

    app.get('/events', function(req, res) {
      res.redirect('/');
    });
    // =====================================
    // ORGANIZERS ==========================
    // =====================================

    app.get('/organizers', function(req, res){
      res.render('organizers/organizers', {title: 'Veranstalter'});
    });

    // =====================================
    // LOCATIONS ===========================
    // =====================================
    app.get('/locations', function(req, res) {
      res.render('locations/locations', {title: 'Clubs, Kneipen & Co'});
    });

    app.get('/locations/:locationAlias', function(req, res){
      var alias = req.params.locationAlias;
      LocationController.get(alias, res);
    });

    // =====================================
    // FESTIVALS ===========================
    // =====================================
    app.get('/festivals', function(req, res){
      res.render('festivals/festivals', {title: 'Festivals'});
    });

    app.get('/festivals/:festivaAlias', function(req, res) {
      var alias = req.params.festivaAlias;
      FestivalController.get(alias, res);
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('admin/login', {title: 'Login' + pagetitle});
    });

    app.get('/admin', function(req, res){
      res.redirect('/login');
    });

    // process the login form
    app.post('/login', passport.authenticate('local-login'), function(req, res){
      console.log(req.user.local);
      res.redirect('/dashboard');
    });

    // =====================================
    // SIGNUP ==============================
    // =====================================
    // show the signup form
    /*app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('admin/signup');
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));*/

    // =====================================
    // Dashboard SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('admin/dashboard', {
          title : 'Dashboard' + pagetitle,
          user : req.user.local // get the user out of session and pass to template
        });
    });

    // =====================================
    // LOGOUT ==============================
    // =====================================
    app.get('/logout', function(req, res) {
        req.logout();
        res.redirect('/');
    });

    // =====================================
    // API Methods ======    PAGES   =======
    // =====================================

    // returns all pages in the db
    app.get('/api/pages', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      PageController.getAll(res);
    });

    // adds a page and its events to the db
    app.post('/api/pages/add', isLoggedIn, function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      PageController.create(req.body, res);
    });

    // deletes a page from the db (and its events)
    app.post('/api/pages/delete', isLoggedIn, function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      PageController.delete(req.body, res);
    });

    // returns the events from a given page
    app.get('/api/events/page', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      var pageId = req.query.pageId;
      if(pageId){
        EventController.getByPage(pageId, res);
      } else {
        res.send({
          events : [],
          error : 'no pageId supplied'
        });
      }
    });

    // =====================================
    // API Methods ======   Events   =======
    // =====================================

    // returns a list of all whitelisted events
    app.get('/api/events/whitelisted', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      EventController.getWhitelisted(res);
    });

    app.get('/api/events/whitelisted/today', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      EventController.getWhitelistedToday(res);
    });

    //returns a array of events sorted after starttime (without today events)
    app.get('/api/events/whitelisted/sorted', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      EventController.getWhitelistedSorted(res);
    });

    // sets a given event to blacklisted/whitelisted depending on the current state
    app.post('/api/events/blacklist', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      var eventId = req.body.eventId;
      var pageId = req.body.pageId;
      if(pageId && eventId){
        EventController.blacklist(pageId, eventId, res);
      } else {
        res.send({
          isBlacklisted : false,
          error : 'insufficient ids supplied'
        });
      }
    });

    app.post('/api/events/addPrivate', isLoggedIn, function(req, res){
      console.log(req.body);
      if(req.body.id) {
        EventController.addManually(req.body.id);
        res.end('done');
      } else {
        res.send('no id supplied.');
      }
    });

    // =====================================
    // API Methods ======   LOCATIONS   ====
    // =====================================

    app.get('/api/locations', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      LocationController.getAll(res);
    });

    app.post('/api/locations/add', isLoggedIn, function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      LocationController.create(req.body, res);
    });

    app.post('/api/locations/delete', isLoggedIn, function(req, res){
      res.setHeader('Content-Type', 'application/json');
      LocationController.delete(req.body.id, res);
    });

    app.post('/api/locations/update', isLoggedIn, function(req, res){
      res.setHeader('Content-Type', 'application/json');
      LocationController.update(req.body, res);
    });

    // =====================================
    // API Methods ======   FESTIVALS   ====
    // =====================================

    app.get('/api/festivals', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      FestivalController.getAll(res);
    });

    app.post('/api/festivals/add', isLoggedIn, function(req, res){
      res.setHeader('Content-Type', 'application/json');
      FestivalController.create(req.body, res);
    });

    app.post('/api/festivals/delete', isLoggedIn, function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      FestivalController.delete(req.body.id, res);
    });

    app.post('/api/festivals/update', isLoggedIn, function(req, res){
      res.setHeader('Content-Type', 'application/json');
      FestivalController.update(req.body, res);
    });
};

// route middleware to make sure a user is logged in
function isLoggedIn(req, res, next) {

    // if user is authenticated in the session, carry on
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}
