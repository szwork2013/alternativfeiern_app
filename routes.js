const bodyParser = require('body-parser');

const auth = require('./config/auth');
const pm = require('./facebook/page_manager');
const em = require('./facebook/event_manager');

pm.setAuthToken(auth.token);

const pagetitle = ' - Alternativ-Feiern';
// app/routes.js
module.exports = function(app, passport) {

    // =====================================
    // HOME PAGE (with login links) ========
    // =====================================
    app.get('/', function(req, res) {
        res.render('index', {title: 'Backend' + pagetitle});
    });

    // =====================================
    // LOGIN ===============================
    // =====================================
    // show the login form
    app.get('/login', function(req, res) {

        // render the page and pass in any flash data if it exists
        res.render('login', {title: 'Login' + pagetitle});
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
    app.get('/signup', function(req, res) {
        // render the page and pass in any flash data if it exists
        res.render('signup');
    });

    // process the signup form
    // app.post('/signup', do all our passport stuff here);
    app.post('/signup', passport.authenticate('local-signup', {
      successRedirect : '/', // redirect to the secure profile section
      failureRedirect : '/signup', // redirect back to the signup page if there is an error
      failureFlash : true // allow flash messages
    }));

    // =====================================
    // Dashboard SECTION =====================
    // =====================================
    // we will want this protected so you have to be logged in to visit
    // we will use route middleware to verify this (the isLoggedIn function)
    app.get('/dashboard', isLoggedIn, function(req, res) {
        res.render('dashboard', {
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
    // API Methods =========================
    // =====================================
    app.get('/api/pages', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      pm.getAllPages(res);
    });

    app.post('/api/pages/add', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      var pageName = req.body.pageName;
      pm.addPage(pageName, res);
    });

    app.post('/api/pages/delete', isLoggedIn, function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      var pageId = req.body.pageId;
      pm.removePage(pageId, res);
    });

    app.post('/api/events/page', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      var pageId = req.body.pageId;
      em.getPageEvents(pageId, res);
    });

    app.get('/api/events/all/short', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      em.getAllEventsShort(res);
    });

    app.post('/api/events/blacklist', function(req, res) {
      res.setHeader('Content-Type', 'application/json');
      var eventId = req.body.eventId;
      em.blackListEvent(eventId, res);
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
