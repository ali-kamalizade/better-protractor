const protractor = require("protractor"); // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
const e2e = require("../js/index.js");
const service = new e2e();

describe('Mobiflip', () => {
	it('should open first article', async() => {
		service.disableAngular();
		service.navigateToRoute('https://mobiflip.de');
		service.pauseBrowserTemporarily(500);
		expect(await service.checkIfRouteContains('mobiflip')).toBe(true);
		service.clickElementByCss('.blog-widget-list > .infinite-post:first-child');
		service.pauseBrowserTemporarily(1000);
	});
});
