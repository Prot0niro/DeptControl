var loginCtrl = function (config) {
	var UserModel = config.UserModel;
	var jwt = config.jwt;
	var secret = config.secret;
	var services = {};

	var searchCallback = function (err, user, req, res) {
		if (err) {
			console.log(err);
			return res.set('Content-Type', 'text/plain').status(500).send();
		};

		if (!user) {
			console.log('Not found');
			return res.set('Content-Type', 'text/plain').status(404).send();
		}

		console.log('Found');

		var token = jwt.sign(user, secret, {
			expiresIn : 60*60*24
		});

		var responseJson = {
			success: true,
			message: 'Login correct',
			token: token
		};

		return res.set('Content-Type', 'application/json').status(200).json(responseJson);
	};

	services.authenticate =function(req, res) {
		var username = req.body.username;
		var password = req.body.password;

		var searchCriteria = {
			username: username,
			password: password
		}

		UserModel.findOne(searchCriteria, function (err, user) {
			return searchCallback(err, user, req, res);
		});
	};

	return services;
};

module.exports = loginCtrl;
