var authenticate = function(req, res, config) {
	var UserModel = config.UserModel;

	var username = req.body.username;
	var password = req.body.password;

	var searchCriteria = {
		username: username,
		password: password
	}

	UserModel.findOne(searchCriteria, function (err, user) {
		return searchCallback(err, user, req, res, config);
	});
};

var searchCallback = function (err, user, req, res, config) {
	if (err) {
		console.log(err);
		return res.set('Content-Type', 'text/plain').status(500).send();
	};

	if (!user) {
		console.log('Not found');
		return res.set('Content-Type', 'text/plain').status(404).send();
	}

	console.log('Found');
	var jwt = config.jwt;

	var token = jwt.sign(user, config.secret, {
		expiresIn : 60*60*24
	});

	var responseJson = {
		success: true,
		message: 'Login correct',
		token: token
	};

	return res.set('Content-Type', 'application/json').status(200).json(responseJson);
};

exports.authenticate = authenticate;
