import {} from "protractor"; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {Key} from "selenium-webdriver";
import {CustomTestService} from "./custom-test.service";

const service: CustomTestService = new CustomTestService();

describe('Bing', () => {
	beforeAll(async () => {
		await service.navigateToRoute('https://bing.de');
		await service.pauseBrowserTemporarily(500);
	});
	it('should navigate to Bing', async () => {
		expect(await service.checkIfRouteContains('bing', await service.getUrl())).toBe(true);
	});
	it('should select cookie disclaimer text', async () => {
		await service.selectText(service.getDomElementByCss('.hpn_top_desc'));
		const selectedText = await service.getSelectedText();
		expect(selectedText).toBeDefined();
	});
	it('should look for protractor and find results', async () => {
		await service.fillInput('#sb_form_q', "protractor angular");
		await service.pauseBrowserTemporarily(1000);
		await service.pressKey(Key.ARROW_DOWN);
		await service.pauseBrowserTemporarily(500);
		await service.pressKey(Key.ENTER);
		await service.pauseBrowserTemporarily(1000);
		expect(await service.getDomElementsCount('.b_algo')).toBeGreaterThan(0);
	});
});
