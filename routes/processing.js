exports.forecastProcessing = function(jsonString){
	var objectJson = JSON.parse(jsonString);
	console.log('objectJson : ' + objectJson);
	// Creation of the response string :
	var response = 'Météo à  ' + objectJson.city.name + ' : ';

	// take the 9 first dt to be sure to have the wether for the day after : 

	return response;

};