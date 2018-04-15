import {} from "protractor"; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {Key} from "selenium-webdriver";
import {CustomTestService} from "./custom-test.service";

const service: CustomTestService = new CustomTestService();

describe('Bing', () => {
	it('should look for protractor', async () => {
		service.navigateToRoute('https://bing.de');
		service.pauseBrowserTemporarily(500);
		expect(await service.checkIfRouteContains('bing', await service.getUrl())).toBe(true);
		service.fillInput('#sb_form_q', "protractor angular");
		service.pauseBrowserTemporarily(1000);
		service.pressKey(Key.ARROW_DOWN);
		service.pauseBrowserTemporarily(500);
		service.pressKey(Key.ENTER);
		service.pauseBrowserTemporarily(1000);
	});
});
