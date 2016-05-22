var request = require('request');
var conf = require('./conf');

exports.receiveMessage = function(req, res, next){
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