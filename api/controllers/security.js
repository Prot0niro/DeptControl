var ensureAuthenticated = function (config, req, res, next) {
	var token = req.body.token || req.query.token || req.headers['x-access-token'];
	var jwt = config.jwt;

	if (token) {
		jwt.verify(token, config.secret, function(err, decoded) {
			if (err) {
				return res.set('Content-Type', 'text/plain').status(403).send();
			}

			req.decoded = decoded;
			next();
		});
	} else {
		return res.set('Content-Type', 'text/plain').status(403).send();
	}
};

exports.ensureAuthenticated = ensureAuthenticated;
