exports.forecastProcessing = function(jsonString){
	var objectJson = JSON.parse(jsonString);
	console.log('name : ' + objectJson.city.name);
	// Creation of the response string :
	var response = 'Météo à ' + objectJson.city.name + ' : \u240D';

	for (i = 0; i < 9; i++){
		// table with the previsions for a delta time
		var values = objectJson.list[i];
		// timestamp of the prevision
		var dt = values.dt;
		// current timestamp
		var curentDt = Math.floor(Date.now() / 1000);
		// hours between the timestamps : 
		var delta = Math.ceil((dt - curentDt)/3600);
		response += 'dans ' + delta + ' heures, il fera ' + values.main.temp + ' degrés \u240D';

	}
	// take the 9 first dt to be sure to have the weather for the day after : 


	return response;

};