import {BetterProtractorService} from "../index";
// noinspection ES6UnusedImports
import {promise} from 'selenium-webdriver';

/**
 * Custom service which extends BetterProtractorService.
 */
export class CustomTestService extends BetterProtractorService {

	constructor(){
		super();
	}

	navigateToRoute(route: string) {
		console.log('overridden method', route);
		return super.navigateToRoute(route);
	}

}
