import {} from "protractor"; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {EndToEndTestingServiceInterface} from "../js";
import {Key} from "selenium-webdriver";

const UtilityService = require("../js/index.js");
const service: EndToEndTestingServiceInterface = new UtilityService();

describe('Google', () => {
	it('should look for sedeo', async () => {
		service.disableAngular();
		service.navigateToRoute('https://google.de');
		service.pauseBrowserTemporarily(500);
		expect(await service.checkIfRouteContains('google', await service.getUrl())).toBe(true);
		service.fillInput('#lst-ib', "sedeo");
		service.pauseBrowserTemporarily(1000);
		service.pressKey(Key.ARROW_DOWN);
		service.pauseBrowserTemporarily(500);
		service.pressKey(Key.ENTER);
		service.pauseBrowserTemporarily(1000);
	});
});
