import {Button} from 'protractor'; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {BetterProtractorService} from "../index";
import {Key} from "selenium-webdriver";

const UtilityService = require("../index.ts");
const service: BetterProtractorService = new UtilityService.BetterProtractorService(false);

describe('Google', () => {
	it('should navigate to Google search', async () => {
		service.navigateToRoute('https://google.de');
		service.pauseBrowserTemporarily(500);
		expect(await service.checkIfRouteContains('google', await service.getUrl())).toBe(true);
	});
	it('should look for sedeo and find results', async () => {
		// demonstrate access of Protractor API
		expect(await service.getAttributeFromDomElement(service.getProtractorElementFinder(service.getProtractorBy().css('#lst-ib')), 'class')).toContain('gsfi');
		service.hoverElement(await service.getDomElementByCss('#lst-ib'));
		service.pauseBrowserTemporarily(1000);
		service.fillInput('#lst-ib', 'sedeo');
		service.pauseBrowserTemporarily(1000);
		service.pressKey(Key.ARROW_DOWN);
		service.pauseBrowserTemporarily(500);
		service.pressKey(Key.ENTER);
		service.pauseBrowserTemporarily(1000);
		expect(await service.getDomElementsCount('.g')).toBeGreaterThan(0);
	});
	it('should open and close Google apps drawer', async () => {
		await service.hoverElementByCss('#gbwa a');
		service.pauseBrowserTemporarily(1500);
		service.pressMouseButton(Button.LEFT);
		service.pauseBrowserTemporarily(1500);
		service.pressKey(Key.ESCAPE);
		service.pauseBrowserTemporarily(1500);
	});
	it('should take a screenshot of the result page', async () => {
		expect(service.screenshot()).not.toThrowError();
	});
});
