// Require my installed modules
	var ping = require('ping');         // This module helps us ping the sites.
	var fs = require('fs');             // This module helps us write a file.
	var request = require('request'); 
	var express = require('express');
	var app = express();

	// Create an array which holds the sites we want to monitor.
	var hosts = ['bbc.co.uk'];

	// Create an empty array where we will bind our data.
	var logs = [];

	//Runs the initial function. (Starts App)
	RunThePings();

	// Our app function.
	function RunThePings(){

		// For each site in our hosts array we run this.
		hosts.forEach(function(host){
			// This will send a ping to our host (site) and then..
			ping.promise.probe(host)
			// runs 'then' function after completion and sends the response to it (res).
		    .then(function (res) {
		    	// creates our json object structure.
		    	var json = {Site:"",Status:"",Time:""};

		    	// binds the host (site) to the json parameter 'Site'.
		    	json.Site = host;
		    	// binds the current time to the json parameter 'Time'. 
		    	// I have handled this in a seperate function and pass the value back to populate this variable.
		    	json.Time = GetCurrentTime();
		    	// If the response of the ping is TRUE then set the json parameter 'Status' to UP.
		    	if (res.alive == true){
		    		json.Status = 'UP';
		    	// .. otherwise it must be down so set the json parameter 'Status' to DOWN.
		    	} else {
		    		json.Status = 'DOWN';
		    	}

		    	// log this completed json object to the console so we can see it.
		    	console.log(json);
		    	// push our json object into the logs array we created earlier.
		    	logs.push(json);
		    	// Run the WriteDataToFile function and pass in the current json object we just created above.
		    	WriteDataToFile(json);
		    });
		});
	    // This just continuously runs the function every 60000 miliseconds (1 minute).
		setTimeout(RunThePings, 60000);
	}

	// Get current time and return the value.
	function GetCurrentTime(){
		var d = new Date();
		var hours = d.getHours();
		var minutes = d.getMinutes();
		var time = hours+ '.' + minutes;
		return time;
	}

	// Creates a file in the location we specify and with the title we specify.
	function WriteDataToFile(){
		fs.writeFile('./json/sites.json', JSON.stringify(logs, null, 4), function (err) {
			console.log(err);
			// Spits out a completion message to the console.
			console.log('Data Recorded Successfully to file');
		});
	}

	// This allows our app to find files in a subfolder called 'json'. This is so I can load the json file from my index.html using jquery ajax.
	app.use("/", express.static(__dirname + '/json'));

	// This makes our app use an index.html file I have created in the project repository as the base for our local host port location. (localhost:2525).
	app.get('/', function (req, res) {
		res.sendFile('/NodeApplications/Ping-UptimeMonitor/index.html');
	});

	// We then tell the app which port to listen on.
	app.listen(2525, function (){
		console.log('listen on port 2525'); // locahost:2525/App
	});
