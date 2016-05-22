var request = require('request');
var conf = require('../conf');

// Dealing with the reception of the message
exports.receiveMessage = function(req, res, next){
  console.log('je suis passe dans receiveMessage!!');
  var message_instances = req.body.entry[0].messaging;
  message_instances.forEach(function(instance){
    var sender = instance.sender.id;
    if(instance.message && instance.message.text) {
      var msg_text = instance.message.text;
      firstMessage(sender, msg_text);
    }
  });
  res.sendStatus(200);
}

//Contruction of the message to send back
function firstMessage(receiver, data){
  var payload = {};
  
  // Construction of the message
  payload = {
    "attachment":{
      "type":"template",
      "payload":{
        "template_type":"button",
        "text":"Bonjour, Que voulez vous faire?",
        "buttons":[
          {
            "type":"postback",
            "title":"Connaitre la météo",
            "payload":"meteo"
          }
        ]
      }
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

exports.meteo = function(req, res){
  payload = {
    text: "Pour utiliser la météo, écrivez meteo-[vote code postal]";
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