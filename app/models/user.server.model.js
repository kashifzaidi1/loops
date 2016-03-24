var mongoose = require('mongoose'),
	crypto = require('crypto'),
	Schema = mongoose.Schema;

var mongooseTypes = require("mongoose-types"); //for valid email and url
mongooseTypes.loadTypes(mongoose, "email");
var Email = mongoose.SchemaTypes.Email;

var UserSchema = new Schema({
	/*concerning user registration process*/
	userEmail: {
		type: Email,
		required: true,
		trim: true,
		unique: true
	},
	password: {
		type: String,
		required: true,
		validate: [
			function(password) {
				return password.length >= 6;
			}
		]
	},
	salt: {
		type: String
	},
	provider: {
		type: String,
		required: true
	},
	providerId: String,
	providerData: {},
});

UserSchema.pre('save', function(next) {
	if (typeof this.salt == 'undefined' && this.password) {
		this.salt = new Buffer(crypto.randomBytes(16).toString('base64'), 'base64');
		this.password = this.hashPassword(this.password);
	}
	next();
});

UserSchema.methods.hashPassword = function(password) {
	return crypto.pbkdf2Sync(password, this.salt, 10000, 64).toString('base64');
};

UserSchema.methods.authenticate = function(password) {
	return this.password === this.hashPassword(password);
};

mongoose.model('User', UserSchema);