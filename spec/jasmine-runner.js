var Jasmine = require('jasmine');
var SpecReporter = require('jasmine-spec-reporter');
var noop = function() {};
process.env.isTesting = true;

var options = {
  displayStacktrace: 'specs',    // display stacktrace for each failed assertion, values: (all|specs|summary|none)
  displayFailuresSummary: true, // display summary of all failures after execution
  displayPendingSummary: true,  // display summary of all pending specs after execution
  displaySuccessfulSpec: true,  // display each successful spec
  displayFailedSpec: true,      // display each failed spec
  displayPendingSpec: false,    // display each pending spec
  displaySpecDuration: false,   // display each spec duration
  displaySuiteNumber: false,    // display each suite number (hierarchical)
  colors: {
    success: 'green',
    failure: 'yellow',
    pending: 'yellow'
  },
  prefixes: {
    success: '✓ ',
    failure: '✗ ',
    pending: '* '
  },
  customProcessors: []
}

var jrunner = new Jasmine();
jrunner.configureDefaultReporter({print: noop});    // remove default reporter logs
jasmine.getEnv().addReporter(new SpecReporter(options));   // add jasmine-spec-reporter
jrunner.loadConfigFile();                           // load jasmine.json configuration
jrunner.execute();
