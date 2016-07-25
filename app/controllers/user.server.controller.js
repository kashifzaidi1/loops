var User = require('mongoose').model('User');
var nodemailer = require('nodemailer');
var path = require('path');
var appDir = path.dirname(require.main.filename); //loops
var fs = require('fs');

exports.create = function(req, res) {
	var credentials = {
		userEmail: req.body.userEmail,
		password: req.body.password
	};

	/* so that one cannot save any thing about user,particularly from api.*/
	var user = new User(credentials);
	user.provider = 'local';

	user.save(function(err) {
		if (err) {
			if(err.code === 11000){
				res.status(400).json({error:'User with this email already exists!'});
			} else if (err.errors.userEmail){
				res.status(400).json({error:'Invalid Email!'});
			} else if (err.errors.password) {
				res.status(400).json({error:'Password must be atleast six characters long!'});
			}
			else {
				res.status(400).json(err);
			}
		} else {
			req.login(user, function(err) {
				if (err) {
					res.status(400).json({error:'Failed To save user in session.'});
				} else {
					res.status(200).json({message:'User is authenticated'});
				}
			});
		}
	});
};

exports.signout = function(req, res) {
	req.logout();
	res.redirect('/dashboard/login');
};

exports.sendEmail = function(req,res) {
	var smtpTransport = nodemailer.createTransport("SMTP",{
	   	service: "Gmail",
	   	auth: {
	       user: "bucketbox.test@gmail.com",
	       pass: "bucketbox123456"
	   	}
	});

	var htmlString = "";
	for (var i in req.body) {
		htmlString += '<b>'+ i +'<b> : <b>'+ req.body[i] + '<b><br><br>'
	};

	var fileAttachment = "";
	if(req.file) {
		fileAttachment = {
	   		fileName : req.file.originalname,
	   		filePath : appDir +'/uploads/' + req.file.filename
	   	}
	}

	smtpTransport.sendMail({
	   from: req.body.email, // sender address
	   to: "sales@loopsdigital.com", // comma separated list of receivers
	   attachments: fileAttachment,
	   subject: "job application", // Subject line
	   html: htmlString    
	}, function(error, response){
		if(req.file) {
			fs.unlink(appDir +'/uploads/' + req.file.filename); // delete the file if there is any after sending as attachment.
		}
	   	if(error){
	       res.redirect('back');
	   	}else{
	       res.redirect('back');
	   	}
	});
}