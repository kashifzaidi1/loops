process.env.NODE_ENV = process.env.NODE_ENV ? process.env.NODE_ENV.toLowerCase() : "development"; 

var express = require('./config/express');
var mongoose = require('./config/mongoose');
var passport = require('./config/passport');

var db = mongoose();
var app = express();
var passport = passport();

app.listen(process.env.PORT || 3000);
console.log('Server running...');