var user = require('../controllers/user.server.controller.js');
var passport = require('passport');
var multer = require('multer');
var upload = multer({ dest: 'uploads/' })

module.exports = function(app) {
	app.post('/signup', user.create);
	
	app.post('/signin', function(req,res,next) {
		passport.authenticate('local', function (err,user,info){
			if(user === false){
				res.status(400).json(info);
			} else {
				// Manually establish the session...
		        req.login(user, function(err) {
		            if (err) return next(err);
		            return res.status(200).json({
		                message: 'user authenticated',
		            });
		        });
			}
		})(req,res,next);
	});

	app.post('/job/sendEmail', upload.single('avatar'), user.sendEmail);
	
	app.get('/signout', user.signout);
};