import {BetterProtractorService} from "../../index";

const protractor = require('protractor');
const tsNode = require('ts-node');
const service: BetterProtractorService= new BetterProtractorService(false);

describe('better-protractor TS', () => {

	it('should have protractor installed', () => {
		expect(protractor).toBeDefined();
	});

	it('should have ts-node installed as we are running Typescript tests now', () => {
		expect(tsNode).toBeDefined();
	});

	it('should create successfully', () => {
		expect(service).toBeDefined();
		const test = Object.getOwnPropertyNames(Object.getPrototypeOf(service));
		test.forEach((key: string) => {
			expect(service[key]).toBeTruthy();
		});
	});
});
