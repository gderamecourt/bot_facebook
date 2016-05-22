var request = require('request');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var conf = require('./conf');
var facebookApi = require('./routes/facebook-api');
var response = require('./routes/response');

var app = express();
app.use(compression());
app.set('case sensitive routing', true);
app.use(bodyParser.json());

var httpServer = http.createServer(app);

app.get('/', function (req, res, next) {
  res.send('Welcome to Facebook Messenger Bot. This is root endpoint');
});

app.get('/webhook/', facebookApi.handleVerify);
app.post('/webhook/', response.receiveMessage);
app.post('/webhook/meteo', response.meteo);

// For heroku assign ports dynamically
var port = process.env.PORT || conf.PORT;
httpServer.listen(port, function () {
  console.log("Express http server listening on port " + port);
});