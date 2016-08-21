var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');
var morgan = require('morgan');

var router = require('./config/router');
var User = require('./config/UserSchema');
var config = require('./config/private/config');

config.mongoose = mongoose;
config.jwt = jwt;
config.UserModel = User.getModel(mongoose);

var app = express();

app.use(bodyParser.json());
app.use(morgan('dev'));

var init = function () {
	router.doRoute(app, config);

  	http.createServer(app).listen(8888);
  	console.log("Server started.");
}

mongoose.connect(config.database);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', init);
