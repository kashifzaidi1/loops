var express = require('express');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

module.exports = function() {
	var app = express();
	
	app.use(express.static('./public'));

	app.use(bodyParser.json());
	
	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use(session({
		saveUnitialized: true,
		resave: true,
		secret: 'SessionSecret',
		cookie : {
			maxAge : 365 * 24 * 60 * 60 * 1000 // won't have to log in for an year.
		}
	}));

	app.use(passport.initialize());
	app.use(passport.session());

	require('../app/routes/user.server.routes.js')(app);
	require('../app/routes/dashboard.server.routes.js')(app);


	return app;
};