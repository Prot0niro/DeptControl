var getModel = function (mongoose) {
	var userSchema = new mongoose.Schema({
		username: { type: String, unique: true },
		password: { type: String },
		admin: Boolean
	});

	var User = mongoose.model('users', userSchema);
	return User;
}


exports.getModel = getModel;
