exports.forecastProcessing = function(jsonString){
	var objectJson = JSON.parse(jsonString);
	console.log('name : ' + objectJson.city.name);
	// Creation of the response string :
	var response = 'Météo à ' + objectJson.city.name + ' dans : \n';

	for (i = 0; i < 8; i++){
		// table with the previsions for a delta time
		var values = objectJson.list[i];
		// timestamp of the prevision
		var dt = values.dt;
		// current timestamp
		var curentDt = Math.floor(Date.now() / 1000);
		// hours between the timestamps : 
		var delta = Math.ceil((dt - curentDt)/3600);

		var meteo = weatherToMeteo(values.weather[0].main);

		response += delta.toString() + 'h : ' + 
			values.main.temp.toString() + '°, '+ meteo + '\n';

	}
	// take the 8 first dt to be sure to have the weather for the day after : 


	return response;

};

function weatherToMeteo(weather){
	var meteo;
	switch(weather.toUpperCase()){
		case 'CLEAR': 
			meteo = 'ciel bleu';
		break;
		case 'CLEAR SKY': 
			meteo = 'ciel bleu';
		break;
		case 'FEW CLOUDS': 
			meteo = 'quelques nuages';
		break;
		case 'SCATTERED CLOUDS': 
			meteo = 'ciel ombragé';
		break;
		case 'BROKEN CLOUDS': 
			meto = 'nuageux';
		break;
		case 'SHOWER RAIN': 
			meteo = 'pluie torrentielle'
		break;
		case 'RAIN': 
			meteo = 'pluie';
		break;
		case 'THUNDERSTORM': 
			meteo = 'orage';
		break;
		case 'SNOW': 
			meteo = 'neige';
		break;
		case 'MIST': 
			meteo = 'brouillard';
		break;

		default: 
			meteo = weather;
	} 
	return meteo;
}