var doPost = function(req, res, UserModel) {
	var username = req.body.username;
	var password = req.body.password;

	var searchCriteria = {
		username: username,
		password: password
	}

	console.log('Searching for: ' + username)
	UserModel.findOne(searchCriteria, function (err, user) {
		return searchCallback(err, user, res);
	});
};

var searchCallback = function (err, user, res) {
	if (err) {
		console.log(err);
		return res.set('Content-Type', 'text/plain').status(500).send();
	};

	if (!user) {
		console.log('Not found');
		return res.set('Content-Type', 'text/plain').status(404).send();
	}

	console.log('Found');
	return res.set('Content-Type', 'text/plain').status(200).send();
}

exports.doPost = doPost;
