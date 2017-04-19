var request = require('request');
var colors = require('colors');
var BuildProcess = require('./BuildProcess');
var Setup = require('./conf/setup');
var loadConfig;

//I'm not a fan of this app providing a wizard to modify a rc file.
//Python, Maven, IRB ... doesn't do this
//var setup = new Setup();
//setup.configure();

// load this only after setup has ensured the config file exists
loadConfig = require('./conf/configure');

//Config must be executed first in this file.
var config = require('nconf').get();

var pollInterval = 10 * 1000;
var buildProcess = new BuildProcess(pollInterval, config);

function buildblink(){
	buildProcess.checkBuild();
	setTimeout(function () {
		buildblink();
	}, pollInterval);
}

module .exports = buildblink;
