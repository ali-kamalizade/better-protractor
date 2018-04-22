const protractor = require('protractor');
const e2e = require("../../dist/index.js");
const service = new e2e.BetterProtractorService();

describe('better-protractor JS', () => {

	it('should have protractor installed', () => {
		expect(protractor).toBeDefined();
	});

	it('should create successfully', () => {
		expect(service).toBeDefined();
		const test = Object.getOwnPropertyNames(Object.getPrototypeOf(service));
		test.forEach((key) => {
			expect(service[key]).toBeTruthy();
		});
	});
});
