var assert = require('assert');
var should = require('should');
var fs = require('fs');

var CodeshipBuildActivity = require('./../lib/domain/CodeshipBuildActivity');


suite('CodeshipBuildActivity', function() {
  var config;
  setup(function() {
    // config = JSON.parse(fs.readFileSync('./conf/default/config.json', "utf8"));
  });


  suite('should_correctly_identify_state_of_build', function() {
    test('should_identify_green_build', function() {
      var buildJson = JSON.parse(fs.readFileSync('./test/fixtures/codeship/api/success.json', "utf8"));
      var activity = new CodeshipBuildActivity(buildJson);

      should.exist(activity.currentBuild.status, 'currentStatus property does not exist');
      should.exist(activity.previousBuild.status, 'previousStatus property does not exist');

      activity.should.have.property('isGreen', true);
    });

    test('should_not_identify_as_building_from_green', function() {
      var buildJson = JSON.parse(fs.readFileSync('./test/fixtures/codeship/api/buildingFromGreen.json', "utf8"));
      var activity = new CodeshipBuildActivity(buildJson);

      should.exist(activity.currentBuild.status, 'currentStatus property does not exist');
      should.exist(activity.previousBuild.status, 'previousStatus property does not exist');

//      activity.should.have.property('isGreen', false);
      activity.should.have.property('isBuilding', false);
      activity.should.have.property('isBuildingFromRed', false);
//      activity.should.have.property('isBuildingFromGreen', true);
    });

    test('should_not_identify_as_building_from_red', function() {
      var buildJson = JSON.parse(fs.readFileSync('./test/fixtures/codeship/api/buildingFromRed.json', "utf8"));
      var activity = new CodeshipBuildActivity(buildJson);

      should.exist(activity.currentBuild.status, 'currentStatus property does not exist');
      should.exist(activity.previousBuild.status, 'previousStatus property does not exist');

//      activity.should.have.property('isGreen', false);
      activity.should.have.property('isBuilding', false);
//      activity.should.have.property('isBuildingFromRed', true);
      activity.should.have.property('isBuildingFromGreen', false);
    });

    test('should_identify_red_build', function() {
      var buildJson = JSON.parse(fs.readFileSync('./test/fixtures/codeship/api/redBuild.json', "utf8"));
      var activity = new CodeshipBuildActivity(buildJson);

      should.exist(activity.currentBuild.status, 'currentStatus property does not exist');
      should.exist(activity.previousBuild.status, 'previousStatus property does not exist');

      activity.should.have.property('isGreen', false);
      activity.should.have.property('isBuilding', false);
      activity.should.have.property('isRed', true);
    });


    test('should_have_proper_build_token', function() {
      var buildJson = JSON.parse(fs.readFileSync('./test/fixtures/codeship/api/redBuild.json', "utf8"));
      var activity = new CodeshipBuildActivity(buildJson);

      activity.should.have.property('instanceToken', buildJson.builds[0].id);
    });
  });
});
