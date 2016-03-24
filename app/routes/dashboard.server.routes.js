var dashboard = require('../controllers/dashboard.server.controller.js');

module.exports = function(app) {	
	app.get('/dashboard',dashboard.showDashboard);
};