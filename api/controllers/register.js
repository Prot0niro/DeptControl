var doPost = function(req, res, UserSchema) {
	var username = req.body.username;
	var password = req.body.password;
	var firstname = req.body.firstname;
	var lastname = req.body.lastname;

	var newUser = new UserSchema();
	newUser.username = username;
	newUser.password = password;
	newUser.firstname = firstname;
	newUser.lastname = lastname;

	console.log('Guardando');
	newUser.save(function (err, savedUSer) {
		if (err) {
			console.log('Error');
			console.log(err);
			res.status(500).send();
		}

		console.log('OK');
		res.status(201).send();
	});
};

exports.doPost = doPost;
