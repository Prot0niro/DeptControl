var doPost = function(req, res, config) {
	var UserModel = config.UserModel;

	var username = req.body.username;
	var password = req.body.password;
	var admin = req.body.admin;

	var newUser = new UserModel();
	newUser.username = username;
	newUser.password = password;
	newUser.admin = admin;

	console.log('Saving');
	newUser.save(function (err, savedUSer) {
		if (err) {
			console.log('Error');
			console.log(err);
			return res.set('Content-Type', 'text/plain').status(500).send();
		}

		console.log('OK');
		return res.set('Content-Type', 'text/plain').status(201).send();
	});
};

exports.doPost = doPost;
