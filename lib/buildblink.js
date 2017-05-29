var request = require('request');
var colors = require('colors');
var BuildProcess = require('./BuildProcess');
var Setup = require('./conf/setup');
var Blink1 = require('node-blink1');
var loadConfig;

//I'm not a fan of this app providing a wizard to modify a rc file.
//Python, Maven, IRB ... doesn't do this
//var setup = new Setup();
//setup.configure();

// load this only after setup has ensured the config file exists
loadConfig = require('./conf/configure');

//Config must be executed first in this file.
var config = require('nconf').get();

var pollInterval = 6 * 1000;
var buildProcess = new BuildProcess(pollInterval, config);


if (process.platform === "win32") {
  var rl = require("readline").createInterface({
    input: process.stdin,
    output: process.stdout
  });

  rl.on("SIGINT", function () {
    process.emit("SIGINT");
  });
}

process.on("SIGINT", function () {
	if (Blink1.devices().length > 0) buildProcess.blink1.fadeToRGB(0, 0, 0, 0, 0, null);

  process.exit();
});


var logNoDevicesFoundAgain = true;
function buildblink(){

	if (Blink1.devices().length === 0) {
		//Don't want to fill the screen up with these messages,
		//But also don't want to continue on
		if (logNoDevicesFoundAgain) console.warn('No blink1 devices found, waiting ....');
		logNoDevicesFoundAgain = false;
	}
	else {
	  buildProcess.checkBuild();
		logNoDevicesFoundAgain = true;
	}

	setTimeout(function () {
		buildblink();
	}, pollInterval);
}

module .exports = buildblink;
