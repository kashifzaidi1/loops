var User = require('mongoose').model('User');

exports.showDashboard = function (req,res){
	if(req.user) {
		res.status(200).json(req.user);
	} else {
		res.status(400).json('User not authenticated');
	}
};