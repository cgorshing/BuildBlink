Build Blink
====================
Uses [ThingM.com](http://thingm.com/)'s  [blink(1)](http://blink1.thingm.com/) product as a continuous integration build light.


[![Build Status](https://travis-ci.org/cgorshing/BuildBlink.png?branch=master)](https://travis-ci.org/cgorshing/BuildBlink)
[![Dependency Status](https://gemnasium.com/cgorshing/BuildBlink.svg)](https://gemnasium.com/cgorshing/BuildBlink)
[![Github Issues](https://img.shields.io/github/issues/cgorshing/BuildBlink.svg)](https://img.shields.io/github/issues/cgorshing/BuildBlink.svg)
[![License](https://img.shields.io/hexpm/l/plug.svg)](https://img.shields.io/hexpm/l/plug.svg)
[![Github Contributors](https://img.shields.io/github/contributors/cdnjs/cdnjs.svg)](https://img.shields.io/github/contributors/cgorshing/BuildBlink.svg)
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
Different colour patterns can be configured.  Default configuration follows the patterns below:

**Patterns**

* **Green** *Successful build*
* **Flashing Green** (temporarily) *Newly successful build*
* **Police Lights** (temporarily)   *Newly failed build*
* **Cycle Green / Yellow**   *Building & previous build was green*
* **Cycle Red / Yellow**   *Building & previous build was red*


Currently tested with one build, one light.

Requirements
------------

TeamCity has to have guestAuth enabled. Your TeamCity should respond to the sample url:

[http://teamcity:8111/guestAuth/app/rest/buildTypes/id:Build_Identifier/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2](http://teamcity:8111/guestAuth/app/rest/buildTypes/id:BranchingTest_Build/builds?locator=running:any,branch:(unspecified:any),lookupLimit:2)

* swap teamcity, and Build_Identifier sections in the above url to test.

Currently only tested on OSX.

Supported CI servers:
----------------------
* Codeship (Thanks to [Greg Stewart](https://github.com/gregstewart))
* ConcourseCI
* Jenkins
* TeamCity
* TBD
    * Travis CI

Contributing
------------
* See the GitHub [**issues**](https://github.com/cgorshing/buildblink/issues?labels=enhancement&state=open) page for enhancements, and submit any new ideas
* Pull Request
* Reach out on [Twitter](https://twitter.com/cgorshing)
