var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('mongoose').model('User');

module.exports = function () {
	passport.use(new LocalStrategy({
		usernameField: 'userEmail',
		passwordField: 'password'
	},function (userEmail,password,done){
		User.findOne({
			userEmail: userEmail
		},function (err,user){
			if(err){
				return done(err);
			}

			if(!user) {
				return done (null,false,{
					error: 'No account matches with this email.Please signup for an account.'
				});
			}

			if(!user.authenticate(password)) {
				return done (null,false,{
					error: 'Invalid password !'
				});
			}

			return done(null,user);
		});
	}));
};