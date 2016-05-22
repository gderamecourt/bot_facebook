var request = require('request');
var http = require('http');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');

var conf = require('./conf');

var app = express();
app.use(compression());
app.set('case sensitive routing', true);
app.use(bodyParser.json());

var httpServer = http.createServer(app);

app.get('/', function (req, res, next) {
  res.send('Welcome to Facebook Messenger Bot. This is root endpoint');
});

app.get('/webhook/', handleVerify);
app.post('/webhook/', receiveMessage);

function handleVerify(req, res, next){
  console.log('je suis passe dans handleVerify!!');
  if (req.query['hub.verify_token'] === conf.VERIFY_TOKEN) {
    console.log('handleVerify success!!');
    return res.send(req.query['hub.challenge']);
  }
  console.log('handleVerify fail!!');
  res.send('Validation failed, Verify token mismatch');
}

function receiveMessage(req, res, next){
  console.log('je suis passe dans receiveMessage!!');
  var message_instances = req.body.entry[0].messaging;
  message_instances.forEach(function(instance){
    var sender = instance.sender.id;
    if(instance.message && instance.message.text) {
      var msg_text = instance.message.text;
      sendMessage(sender, msg_text, true);
    }
  });
  res.sendStatus(200);
}

function sendMessage(receiver, data, isText){
  var payload = {};
  payload = data;
  
  if(isText) {
    payload = {
      text: data
    }
  }

  request({
    url: conf.FB_MESSAGE_URL,
    method: 'POST',
    qs: {
      access_token: conf.PROFILE_TOKEN
    },
    json: {
      recipient: {id: receiver},
      message: payload
    }
  }, function (error, response) {
    if(error) console.log('Error sending message: ', error);
    if(response.body.error) console.log('Error: ', response.body.error);
  });
}

// For heroku assign ports dynamically
var port = process.env.PORT || conf.PORT;
httpServer.listen(port, function () {
  console.log("Express http server listening on port " + port);
});