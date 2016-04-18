
Error.stackTraceLimit = Infinity;



require('es6-promise');
require('es6-shim');
require('reflect-metadata');

require('zone.js/dist/zone');
require('zone.js/dist/long-stack-trace-zone');
require('zone.js/dist/jasmine-patch');


var testing = require('angular2/testing');
var browser = require('angular2/platform/testing/browser');

testing.setBaseTestProviders(
    browser.TEST_BROWSER_PLATFORM_PROVIDERS,
    browser.TEST_BROWSER_APPLICATION_PROVIDERS);

require('./src/spec/support/jasmine.json');
require('./src/spec/helpers/marble-testing');
require('./src/spec/helpers/test-helper');



/*
 Ok, this is kinda crazy. We can use the the context method on
 require that webpack created in order to tell webpack
 what files we actually want to require or import.
 Below, context will be an function/object with file names as keys.
 using that regex we are saying look in ./src/app and ./test then find
 any file that ends with spec.js and get its path. By passing in true
 we say do this recursively
 */
var testContext = require.context('./src/app', true, /\.spec\.ts/);

// get all the files, for each file, call the context function
// that will require the file and load it up here. Context will
// loop and require those spec files here
testContext.keys().forEach(testContext);