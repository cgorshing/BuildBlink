Build Blink
====================
Uses [ThingM.com](http://thingm.com/)'s  [blink(1)](http://blink1.thingm.com/) product as a continuous integration build light.


[![Build Status](https://travis-ci.org/cgorshing/BuildBlink.png?branch=master)](https://travis-ci.org/cgorshing/BuildBlink)
[![Dependency Status](https://gemnasium.com/cgorshing/BuildBlink.svg)](https://gemnasium.com/cgorshing/BuildBlink)
[![License](https://img.shields.io/hexpm/l/plug.svg)](https://img.shields.io/hexpm/l/plug.svg)

[![Code Climate](https://img.shields.io/codeclimate/github/cgorshing/BuildBlink.svg)](https://img.shields.io/codeclimate/github/cgorshing/BuildBlink.svg)
[![Code Climate](https://img.shields.io/codeclimate/coverage/github/cgorshing/BuildBlink.svg)](https://img.shields.io/codeclimate/coverage/github/cgorshing/BuilBlink.svg)
[![Code Climate](https://img.shields.io/codeclimate/issues/github/cgorshing/BuildBlink.svg)](https://img.shields.io/codeclimate/issues/github/cgorshing/BuildBlink.svg)

Install & Usage
---------------

install:
`npm install buildblink -g`

run:
`buildblink`

* you will be prompted for configuration information on first run.
* to modify configuration after install, edit your `~/.buildblinkrc` file.


Features
----------
Different color patterns can be configured.  Default configuration follows the patterns below:

##### Patterns
* **Green** *Successful build*
* **Flashing Green** (temporarily) *Newly successful build*
* **Police Lights** (temporarily)   *Newly failed build*
* **Cycle Green / Yellow**   *Building & previous build was green*
* **Cycle Red / Yellow**   *Building & previous build was red*

##### Color Strength
If not provided, the RGB value used for each color is 255. Using a `colorStrength` setting in the `~/.buildblinkrc` file, you can adjust the _brightness_ used for each color. This helps when developing in various light conditions.

You can find examples of this configuration in the sample `~/.buildblinkrc` files below.

##### blink1's
Currently tested with multiple builds using one light. There does exist an [open issue](https://github.com/cgorshing/BuildBlink/issues/1) to add support for many lights each corresponding to a specific set of builds, such as a different server or team.

Requirements
------------

TeamCity has to have guestAuth enabled. Your TeamCity should respond to the sample url:

[http://teamcity:8111/guestAuth/app/rest/buildTypes/id:Build_Identifier/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2](http://teamcity:8111/guestAuth/app/rest/buildTypes/id:BranchingTest_Build/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2)

* swap TeamCity, and Build_Identifier sections in the above url to test.

Currently only tested on OSX.

Supported CI servers:
----------------------
* Codeship (Thanks to [Greg Stewart](https://github.com/gregstewart))
* ConcourseCI
* Jenkins
* TeamCity
* TBD
    * Travis CI

Example Configuration Files
---------------------------
#### Jenkins
```json
{
  "serviceType": 3,
  "jenkinsHost": "jenkins.example.com",
  "jenkinsScheme": "https",
  "username": "your-user-name",
  "__comment": "The colorStrength setting is optional",
  "colorStrength": 175,
  "apiToken": "d531727b16614332a3fdc09c583f8038",

  "jenkinsBuildNumbers": [
    {
      "name": "build-1-to-monitor",
      "id": "Some-Folder-Name/job/the-build-name"
    },
    {
      "name": "build-2-to-monitor",
      "id": "the-build-name2"
    }
  ]
}
```

#### Concourse
```json
{
  "serviceType": 4,
  "concourseHost": "concourse.ci.example.com",
  "concourseScheme": "http",
  "__comment": "The colorStrength setting is optional",
  "colorStrength": 175,

  "concourseBuildNumbers": [
    {
      "job_name": "some-job-name",
      "team": "the-team-name",
      "pipeline": "the-pipeline-name"
    },
    {
      "job_name": "some-job-name-2",
      "team": "the-team-name-2",
      "pipeline": "the-pipeline-name-2"
    }
  ]
}
```

Contributing
------------
* See the GitHub [**issues**](https://github.com/cgorshing/buildblink/issues?labels=enhancement&state=open) page for enhancements, and submit any new ideas
* Pull Request
* Reach out on [Twitter](https://twitter.com/cgorshing)
