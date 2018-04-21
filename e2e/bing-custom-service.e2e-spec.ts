import {} from "protractor"; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {Key} from "selenium-webdriver";
import {CustomTestService} from "./custom-test.service";

const service: CustomTestService = new CustomTestService();

describe('Bing', () => {
	it('should navigate to Bing', async () => {
		service.navigateToRoute('https://bing.de');
		service.pauseBrowserTemporarily(500);
		expect(await service.checkIfRouteContains('bing', await service.getUrl())).toBe(true);
	});
	it('should look for protractor and find results', async () => {
		service.fillInput('#sb_form_q', "protractor angular");
		service.pauseBrowserTemporarily(1000);
		service.pressKey(Key.ARROW_DOWN);
		service.pauseBrowserTemporarily(500);
		service.pressKey(Key.ENTER);
		service.pauseBrowserTemporarily(1000);
		expect(await service.getDomElementsCount('.b_algo')).toBeGreaterThan(0);
	});
});
