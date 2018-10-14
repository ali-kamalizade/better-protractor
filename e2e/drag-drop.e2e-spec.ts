import {} from 'protractor'; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {BetterProtractorService} from "../index";

const UtilityService = require("../index.ts");
const service: BetterProtractorService = new UtilityService.BetterProtractorService(false);

describe('Drag & Drop', () => {
	it('works with custom drag & drop libraries', async () => {
		const sourceIndex = 1;
		const targetIndex = 3;
		const listClass = 'StackedListItem--item';
		await service.navigateToRoute('https://shopify.github.io/draggable/examples/simple-list.html');
		await service.dragElement(
			service.getDomElementByCss(`.${listClass}${sourceIndex}`),
			service.getDomElementByCss(`.${listClass}${targetIndex}`),
			100
		);
		const movedItem = service.getDomElementByCss(`.StackedList > li:nth-child(${targetIndex})`);
		expect(await service.getAttributeFromDomElement(movedItem, 'class')).toContain(`${listClass}${sourceIndex}`);
	});
});
