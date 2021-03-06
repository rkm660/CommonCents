// Babel ES6/JSX Compiler
require('babel-register');

var swig = require('swig');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var routes = require('../app/routes');

var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session')
var cookieParser = require('cookie-parser')


//DB
var dbConfig = require('./db.js');
var mongoose = require('mongoose');
var User = require('./models/User.js')

var passport = require('passport'),
    FacebookStrategy = require('passport-facebook').Strategy;

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname.substring(0, __dirname.length-7), '/public')));
app.use(cookieParser())

mongoose.connect(dbConfig.url);

//Authentication
app.use(session({ resave: true, 'saveUninitialized': true, secret: 'secret' }));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new FacebookStrategy({
        clientID: "308085112938841",
        clientSecret: "b15bb2a156617f86c6c99fcda1246f55",
        callbackURL: "http://localhost:3000/auth/facebook/callback",
        profileFields: ["id", "birthday", "email", "first_name", "gender", "last_name", "location", "hometown"],
    },
    function(accessToken, refreshToken, profile, done) {
        process.nextTick(function() {
            User.findOne({ 'userID': profile.id }, function(err, user) {
                if (err)
                    return done(err);
                if (user)
                    return done(null, user);
                else {
                    var newUser = new User();
                    newUser.userID = profile.id;
                    newUser.token = accessToken;
                    newUser.first_name = profile.name.givenName;
                    newUser.last_name = profile.name.familyName;
                    newUser.email = profile.emails[0].value;
                    newUser.location = profile._json.location.name;
                    newUser.hometown = profile._json.hometown.name;
                    newUser.save(function(err) {
                        if (err)
                            throw err;
                        return done(null, newUser);
                    })
                }
            });
        });
    }
));

app.get('/auth/facebook', passport.authenticate('facebook', { scope: ['email', 'user_location', 'user_hometown']}));
app.get('/auth/facebook/callback', function(req, res, next) {
    passport.authenticate('facebook', function(err, user, info) {
        if (err) {
            return next(err); }
        if (!user) {
            return res.redirect('/'); }
        req.logIn(user, function(err) {
            if (err) {
                return next(err); }
            return res.redirect('/profile');
        });
    })(req, res, next);
});

app.get('/current_user', function(req, res){
    res.send(req.user);
});

passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});

app.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});

//General routing
app.use(function(req, res) {
    var url;
    if (req.url.includes('css') || req.url.includes('js')){
        url = req.url.substring(1, req.url.length);
    }
    else {
        url = req.url;
    }
    Router.match({ routes: routes.default, location: req.url }, function(err, redirectLocation, renderProps) {
        console.log(url);
        if (err) {
            res.status(500).send(err.message)
        } else if (redirectLocation) {
            res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
        } else if (renderProps) {
            var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
            var page = swig.renderFile('views/index.html', { html: html });
            res.status(200).send(page);
        } else {
            res.status(404).send('Page Not Found')
        }
    });
});

app.listen(app.get('port'), function() {
    console.log('Express server listening on port ' + app.get('port'));
});
