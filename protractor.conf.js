// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts
require ("protractor"); // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
const {SpecReporter} = require('jasmine-spec-reporter');
// todo Chrome for CI
process.env.CHROME_BIN = process.env.CHROME_BIN || require('puppeteer').executablePath();

const baseUrl = 'https://github.com'; /* Live testing*/
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
			args: [... isRunningInCi()? service.chromeDriverCiOptions : ''].concat(service.chromeDriverHideMessages),
			binary: isRunningInCi()? process.env.CHROME_BIN : undefined
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
// if running in Ci, additional chrome options will be added so Protractor can run in CI
function isRunningInCi() {
	const arg = process.argv0;
	return arg.indexOf("C:\\") === -1 || arg === 'node';
}
