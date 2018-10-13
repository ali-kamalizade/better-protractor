import {Button} from 'protractor'; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {BetterProtractorService} from "../index";
import {Key} from "selenium-webdriver";

const UtilityService = require("../index.ts");
const service: BetterProtractorService = new UtilityService.BetterProtractorService(false);

describe('Google', () => {
	it('should navigate to Google search', async () => {
		await service.navigateToRoute('https://google.de');
		await service.pauseBrowserTemporarily(500);
		expect(await service.checkIfRouteContains('google', await service.getUrl())).toBe(true);
	});
	it('should look for sedeo and find results', async () => {
		// demonstrate access of Protractor API
		expect(await service.getAttributeFromDomElement(service.getProtractorElementFinder(service.getProtractorBy().css('#lst-ib')), 'class')).toContain('gsfi');
		await service.hoverElement(service.getDomElementByCss('#lst-ib'));
		await service.pauseBrowserTemporarily(1000);
		await service.fillInput('#lst-ib', 'sedeo');
		await service.pauseBrowserTemporarily(1000);
		await service.pressKey(Key.ARROW_DOWN);
		await service.pauseBrowserTemporarily(500);
		await service.pressKey(Key.ENTER);
		await service.pauseBrowserTemporarily(1000);
		expect(await service.getDomElementsCount('.g')).toBeGreaterThan(0);
	});
	it('should open and close Google apps drawer', async () => {
		await service.hoverElementByCss('#gbwa a');
		await service.pauseBrowserTemporarily(1500);
		await service.pressMouseButton(Button.LEFT);
		await service.pauseBrowserTemporarily(1500);
		await service.pressKey(Key.ESCAPE);
		await service.pauseBrowserTemporarily(1500);
	});
	it('should take a screenshot of the result page with visible mouse pointer', async () => {
		await service.showMousePointer();
		service.screenshot();
		await service.hideMouse();
	});
});
