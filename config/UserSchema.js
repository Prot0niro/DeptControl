var getSchema = function (mongoose) {
	var userSchema = new mongoose.Schema({
		username: { type: String, unique: true },
		password: { type: String },
		firstname: String,
		lastname: String
	});

	var User = mongoose.model('myUser', userSchema);
	return User;
}


exports.getSchema = getSchema;
