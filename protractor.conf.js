// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
require ("protractor"); // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
const {SpecReporter} = require('jasmine-spec-reporter');

const baseUrl = 'https://sedeo.net/'; /* Live testing*/
const timeout = baseUrl.indexOf('https://') === -1? 60000 : 25000;

//const UtilityService = require('./index.ts');
const UtilityService = require('./dist/index.js');
const service = new UtilityService.BetterProtractorService();

exports.config = {
	allScriptsTimeout: timeout,
	specs: [
		'./e2e/**/*.e2e-spec.ts',
		'./e2e/**/*.e2e-spec.js'
	],
	capabilities: {
		'browserName': 'chrome',
		// disable "Chrome is being controlled by automated software"
		chromeOptions: {
			args: [... service.chromeDriverHideMessages]
		}
	},
	directConnect: true,
	baseUrl: baseUrl,
	framework: 'jasmine',
	jasmineNodeOpts: {
		showColors: true,
		defaultTimeoutInterval: timeout,
		print: function () {
		}
	},
	beforeLaunch: function () {
		require('ts-node').register({
			project: './e2e/tsconfig.e2e.json'
		});
	},
	onPrepare() {
		jasmine.getEnv().addReporter(new SpecReporter({spec: {displayStacktrace: true}}));
		// for better testing: disable Angular on non-Angular page and maximize window
		service.disableAngular();
		service.maximizeWindow();
		service.navigateToRoute(baseUrl);
	},
};
