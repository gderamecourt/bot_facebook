// Imports
var request = require('request');
var conf = require('../conf');
var processing = require('./processing');


// Dealing with the reception of the message
exports.receiveMessage = function(req, res, next){
  var message_instances = req.body.entry[0].messaging;
  message_instances.forEach(function(instance){
    var sender = instance.sender.id;
    if(instance.message && instance.message.text) {
      var msg_text = instance.message.text;
      if (msg_text.substring(0,2).toUpperCase() === 'M '){
        var city = 'on sen fout bordel';
        meteoRequest(sender, city);
      } else {
        firstMessage(sender, msg_text.substring(6));  
      }
    } else if(instance.postback && instance.postback.payload) {
      // If the message is sent from a button postback : 
      payload = instance.postback.payload;
      
      console.log('Je suis dans le postback et le postback est : ' + payload);

      // if the postback is 'meteo'
      if (payload === 'meteo'){
        meteoHowTo(sender);
      }
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

// explains how to use the meteo function
function meteoHowTo(receiver){
  sendResponse(receiver, 'Pour consulter la météo, écrivez m [nom de votre ville]');
}

// gives the meteo back
function meteoRequest(receiver, city){
  // http://api.openweathermap.org/data/2.5/weather?q=London&units=metric&APPID=conf.OWM_ID
  var query = 'http://api.openweathermap.org/data/2.5/forecast?q=London&units=metric&APPID=' + conf.OWM_ID;

  var response = '';
  request(query, function(error, response, body){
    if (error !== null) {
      response = 'une erreur s\'est produite';
    } else {
      try {
        response = processing.forecastProcessing(body);
      } catch (err) {
        console.log('Erreur : ' + err);
        response = err;
      }
      console.log('response : ' + response);
    }

  });

  sendResponse(receiver, response);

}

// Function sending a response
function sendResponse(receiver, message){
  payload = {
    text: message
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