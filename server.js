let config = process.env.NODE_ENV === 'production' ? null : require('./config.js');


const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth2').Strategy;
const db = require('./database/db');
const insert = require('./database/inserts');
const query = require('./database/queries');
const update = require('./database/updates');
const deletes = require('./database/deletes');

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(obj, done) {
  done(null, obj);
});

passport.use(new GoogleStrategy({
	clientID: process.env.GOOGLE_CLIENT_ID || config.GOOGLE_CLIENT_ID,
	clientSecret: process.env.GOOGLE_CLIENT_SECRET || config.GOOGLE_CLIENT_SECRET,
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
		  .then(() => {
		  	console.log(`inserted ${req.user.displayName} into database`);
		  })
		  .catch((err) => {
		  	console.log(`didn't insert ${req.user.displayName} into db, probably because theyre already in there`);
		  })
    	res.redirect('/');
});

app.get('/auth/verify', (req, res) => {
	if (req.user) {
		query.users(req.user.displayName)
		  .then((user) => res.send(user[0]))
	} else {
		res.send(null);
	}
});

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/');
});

app.get('/api/getCats', (req, res) => {
	if (req.query && req.query.rank === 'rank') {
		query.rankCats()
		  .then((data) => res.send(data));
	} else {
      query.cats()
        .then((data) => res.send(data));
    }
});

app.get('/api/search', (req, res) => {
  const q = `%${req.query.input}%`;
  	query.searchUsers(q)
  	  .then((users) => {
  	  	query.searchCats(q)
  	  	  .then((cats) => {
  	  	  	res.send({ users, cats });
  	  	  });
  	  });
});

app.get('/api/getuser', (req, res) => {
	if (req.query.id) {
		query.userid(req.query.id).then((user) => {
			query.userComments(req.query.id).then((comments) => {
				query.userFollowers(req.query.id).then((followers) => {
					query.userFollowing(req.query.id).then((following) => {
						query.userFavorites(req.query.id).then((favorites) => {
							res.send({
								user: user[0],
								comments,
								followers,
								following,
								favorites
							})
						})
					})
				})
			})
		})
	} else {
		res.end();
	}
});

app.get('/api/getcat', (req, res) => {
	query.cats(req.query.id)
	  .then((cat) => {
	  	query.catComments(req.query.id)
	  	  .then((comments) => {
	  	  	query.catLikes(req.query.id)
	  	  	  .then((likes) => {
	  	  	  	if (req.query.user !== 'false' && req.query.user !== 'undefined') {
	  	  		  query.areFavorites(req.query.user, req.query.id)
	  	  		    .then((favorite) => {
	  	  		  	  res.send({ cat: cat[0], comments, likes, favorite });
	  	  		    })
	  	  	    } else {
	  	  		  res.send({ cat: cat[0], comments, likes });
	  	  	    }
	  	  	  })
	  	  })
	  })
	  .catch((err) => {
	    console.log('error retrieving cat: ', err);
	  	res.end();
	  });
});

app.get('/api/checkFavorites', (req, res) => {
	query.areFavorites(req.query.userid, req.query.cat1id)
	  .then((cat1) => {
	  	if (req.query.cat2id !== 'undefined') {
	  	  query.areFavorites(req.query.userid, req.query.cat2id)
	  	    .then((cat2) => {
	  	  	  res.send({ cat1, cat2 })
	  	    })
	  	    .catch((err) => console.log('error: ', err))
	  	} else {
	  		res.send({ cat1 })
	  	}
	  })
	  .catch((err) => console.log('error: ', err))
});

app.post('/api/vote', (req, res) => {
  update.winner(req.body.winner.id);
  update.loser(req.body.loser.id);
  res.end();
});

app.post('/api/addComment', (req, res) => {
	insert.comment(req.body)
	  .then(() => console.log('success'))
	  .catch((err) => console.log('error inserting comment: ', err))
	res.end();
});

app.post('/api/follow', (req, res) => {
	console.log('req.body: ', req.body)
	insert.follower(req.body)
	  .then(() => console.log('success'))
	  .catch((err) => console.log('error inserting follower: ', err))
	res.end();
});

app.post('/api/unfollow', (req, res) => {
    deletes.follower(req.body)
      .then(() => console.log('unfollowed'))
      .catch((err) => console.log('error unfollowing user: ', err))
    res.end();
});

app.post('/api/addFavorite', (req, res) => {
	insert.favorite(req.body)
	  .then(() => {
	  	query.areFavorites(req.body.user, req.body.cat)
	  	  .then((favorite) => {
	  	  	res.send({ favorite })
	  	  })
	  })
});

app.post('/api/removeFavorite', (req, res) => {
	deletes.favorites(req.body.user, req.body.cat)
	  .then(() => res.end())
});

app.post('/api/deleteComment', (req, res) => {
	deletes.comment(req.body.comment)
	  .then(() => res.end())
});

app.get('/api/deleteUser', (req, res) => {
	deletes.allRelationships(req.query.id)
	  .then(() => deletes.userComments(req.query.id)
	  	.then(() => deletes.userFavorites(req.query.id)
	  		.then(() => deletes.user(req.query.id)
	  			.then(() => {
	  				res.end();
	  			})
	  		)
	  	)
	  )
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/www/index.html'));
});

const server = app.listen(process.env.PORT || 3000, function() {
	const host = server.address().address;
	const port = server.address().port;
	console.log('process.env.PORT: ', process.env.PORT)
	console.log('Votepurrrme listening at http://%s:%s', host, port);
});


