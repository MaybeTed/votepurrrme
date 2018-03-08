let config = {};
try {
	config = require('./config.js');
} catch (err) {
	console.log('can\'t find config file: ', err);
}

const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('./database/db');
const insert = require('./database/inserts');
const query = require('./database/queries');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
	clientID: config.GOOGLE_CLIENT_ID,
	clientSecret: config.GOOGLE_CLIENT_SECRET,
	callbackURL: "http://localhost:3000/auth/google/callback",
	passReqToCallback: true
  },
  function(request, accessToken, refreshToken, profile, done) {
	process.nextTick(function() {
		return done(null, profile);
	});
  }
));

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'monorail cat', resave: false, saveUninitialized: false }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/www'));

app.get('/auth/google', passport.authenticate('google', { scope: ['email', 'profile'] }),
	(req, res) => {
		// The request will be redirected to Google for authentication, so this
		// function will not be called
	}
);

app.get('/auth/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
	(req, res) => {
		insert.user(req.user)
		  .then(() => console.log(`inserted ${req.user.displayName} into database`))
		  .catch((err) => console.log(`didn't insert ${req.user.displayName} into db, error: `, err))
    	res.redirect('/');
});

app.get('/auth/verify', (req, res) => {
	if (req.user) {
		res.send(req.user);
	} else {
		res.send(null);
	}
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

app.get('/api/getCats', (req, res) => {
  query.cats()
    .then((data) => {
    	console.log('data from cats query: ', data);
    	res.send(data);
    })
});

const server = app.listen(3000, '127.0.0.1',  function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('Example app listening at http://%s:%s', host, port);
});
