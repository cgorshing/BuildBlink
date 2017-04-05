var vsprintf = require('sprintf').sprintf;
var request = require('request');
var prettyjson = require('prettyjson');
var fs = require('fs');

var TeamCityGatewayMock = function(server, postfix) {
	this.server = server; //TODO: remove hard coded default after integration tests.
  this.postfix = postfix;
};

TeamCityGatewayMock.prototype = {
	getBuildsForProjectId: function(projectId, callback) {
		if (!projectId) {
			callback("Hmmmm...  you asked me to check a null build.", undefined);
			return;
		}

		//callback(null, '{"build":{"id":83,"number":"26","status":"FAILURE","buildTypeId":"bt4","branchName":"/testingTeamcity","startDate":"20130105T151616-0700","href":"/httpAuth/app/rest/builds/id:83","webUrl":"http://192.168.1.194:81/viewLog.html?buildId=83&buildTypeId=bt4"},"previousBuild":{"id":81,"number":"25","status":"SUCCESS","buildTypeId":"bt4","startDate":"20130105T014834-0700","href":"/httpAuth/app/rest/builds/id:81","webUrl":"http://192.168.1.194:81/viewLog.html?buildId=81&buildTypeId=bt4"},"instanceToken":"bt4:83","isBuildingFromGreen":false,"isGreen":false,"isBuilding":false,"isBuildingFromRed":false,"isRed":true,"isFreshlyRed":false,"isFreshlyGreen":false,"isPreviousBuildRed":false}');

    var buildJson = JSON.parse(fs.readFileSync('./test/samples/teamcityApi/mockedGateway.json', "utf8"));
    callback(null, buildJson);
	}
};

module.exports = TeamCityGatewayMock;
