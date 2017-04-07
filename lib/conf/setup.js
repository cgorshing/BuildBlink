var fs = require('fs');
var readline = require('readline-sync');

var Setup = function() {};

Setup.prototype = {

  configExists: function() {
    return fs.existsSync(this.getConfigFile());
  },
  getUserHome: function() {
    return process.env[(process.platform == 'win32') ? 'USERPROFILE' : 'HOME'];
  },
  getConfigFile: function() {
    return this.getUserHome() + '/.buildblinkrc';
  },
  configure: function() {
    if (!this.configExists()) {
      console.log("no configuration file exists.");
      this.gatherConfig();
      return true;
    }
  },
  gatherConfig: function() {
    var name, config = {}, id;
    console.log("Configure your first build:");
    var serviceType = prompt('CI service (enter number): \r\n 1. Teamcity \r\n 2. Codeship \r\n -->');
    config.serviceType = serviceType;
    if(serviceType === 1) {
      var teamcityServer = prompt('What is your Teamcity Server? (ip/fqdn and port.  No http)\r\n --> ');
      id = prompt('What is the buildtype id? \r\n --> ');
      name = prompt('What is the friendly name of this build? \r\n --> ');

      config.type = 1;
      config.teamcityHost = teamcityServer;
      config.teamcityBuildNumbers = [
      {
        "name": name,
        "id":  id
      } ];
    } else {
      var apiKey = prompt('What is the api key id? \r\n --> ');
      id = prompt('What is the projectId of this build? \r\n --> ');
      name = prompt('What is the friendly name of this build? \r\n --> ');

      config.host = 'https://www.codeship.io/api/v1/';
      config.apiKey = apiKey;
      config.codeshipBuildNumbers = [
      {
        "name": name,
        "id":  id
      } ];
    }

    var configContents = JSON.stringify(config, null, 4);
    console.log(configContents);
    fs.writeFileSync(this.getConfigFile(), configContents);
    console.log("Thank you.  Checking builds . . . ");
  }
};

module.exports = Setup;
