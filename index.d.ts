import {WebdriverWebElement} from "protractor/built/element";
import {ElementArrayFinder, ElementFinder, ProtractorBrowser, ProtractorBy} from "protractor";
import {IWebDriverOptionsCookie, WebElement} from "selenium-webdriver";

/**
 * Provides helper methods which allow for testing common test cases.
 * @see BetterProtractorService.ts - If you add a new method here, please add the method implementation there
 */
export interface BetterProtractorService {

	new(isDisabled?: boolean): BetterProtractorService;

	/**
	 * Get the current browser URL
	 * @returns {promise.Promise<string>}
	 * @param useDriver {boolean}
	 */
	getUrl(useDriver?: boolean): string;
	/**
	 * Navigate to a route.
	 * @returns {wdpromise.Promise<any>}
	 * @param path {string}
	 */
	navigateToRoute(path?: string): any;
	/**
	 * Don't let Protractor close the browser after execution
	 * @return {*}
	 */
	pauseBrowser(): any;
	/**
	 * Wait for Angular to be initialized
	 * @return {void|promise.Promise<any>}
	 */
	waitForBrowser(): any;
	/**
	 * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
	 * @return {promise.Promise<boolean>}
	 */
	disableAngular(): any;
	/**
	 * Don't let Protractor close the browser after execution for a specific time. You can use this as an alternative in case pauseBrowser() does not work.
	 * @param time {number} in milliseconds
	 */
	pauseBrowserTemporarily(time: number): any;
	/**
	 * @param contains {string | Array}
	 * @param url {string} if not passed, then current url will be used
	 * @return {boolean}
	 */
	checkIfRouteContains(contains: string, url?: string): boolean;
	/**
	 * Use this method to set the browser window to a specific size( default is 360 x 640).
	 * If this method crashes the browser, then you may need to update with the command "webdriver-manager update".
	 * @param width {number}
	 * @param height {number}
	 */
	showMobileView(width?: number, height?: number): any;
	/**
	 * Use this method to maximize the browser window.
	 * If this method crashes the browser, then you need to update with "webdriver-manager update".
	 * @return {promise.Promise<void>}
	 */
	maximizeWindow(): any;
	/**
	 * Get height and width of browser window
	 * @return {promise.Promise<ISize>}
	 */
	getWindowSize(): {height: number, width: number};
	/**
	 * Get browser cookies
	 * @returns {promise.Promise<IWebDriverOptionsCookie>}
	 */
	getCookies(): IWebDriverOptionsCookie [];
	/**
	 * Get an element by its DOM id
	 * @returns {ElementFinder}
	 * @param elementId {string}
	 */
	getDomElementById(elementId: string): ElementFinder;
	/**
	 * Get an element by its DOM tag
	 * @returns {ElementFinder}
	 * @param elementTag {string}
	 */
	getDomElementByTag(elementTag: string): ElementFinder;
	/**
	 * Get an element by its XPath
	 * @returns {ElementFinder}
	 * @param xpath {string}
	 */
	getDomElementByXPath(xpath: string): ElementFinder;
	/**
	 * Get an element by CSS query
	 * @returns {ElementFinder}
	 * @param selector {string}
	 */
	getDomElementByCss(selector: string): ElementFinder;
	/**
	 * @param selector {string}
	 * @param index {number}
	 * @return {ElementFinder}
	 */
	getDomElementByIndex(selector: string, index: number): ElementFinder;
	/**
	 * Get an element
	 * @returns {WebElementPromise}
	 * @param element
	 */
	getElementAsWebElement(element: ElementFinder): any;
	/**
	 * @param css {string} the CSS selector
	 * @param text {string}
	 */
	getDomElementByText(css: string, text: string): ElementFinder;
	/**
	 * Scroll to a DOM element
	 * @param selector
	 * @returns {promise.Promise<void>}
	 */
	scrollToElement(selector: string): any;
	/**
	 * Check if a element is visible and if it can be selected
	 * @param element
	 * @return {wdpromise.Promise<boolean> | webdriver.promise.Promise.<boolean>}
	 */
	checkIfExists(element: WebdriverWebElement): boolean;
	/**
	 * Check if a element is visible
	 * @param element
	 * @return {wdpromise.Promise<boolean> | webdriver.promise.Promise.<boolean>}
	 */
	checkIfVisible(element: WebdriverWebElement): boolean;
	/**
	 * Get an attribute from a DOM element (e.g. class)
	 * @param element
	 * @param attribute {string} e.g. 'value' (to get input value) or 'class'
	 */
	getAttributeFromDomElement(element, attribute: string): any;
	/**
	 * Click a element
	 * @returns {Promise}
	 * @param element
	 */
	clickElement(element): any;
	/**
	 * Click a element by CSS
	 * @returns {Promise}
	 * @param css {string}
	 */
	clickElementByCss(css: string): any;
	/**
	 * Click a element by ID
	 * @returns {Promise}
	 * @param elementId {string}
	 */
	clickElementById(elementId: string): any;
	/**
	 * Click a element with an tag
	 * @returns {Promise}
	 * @param elementTag {string}
	 */
	clickElementByTag(elementTag: string): any;
	/**
	 * Click a element by XPath
	 * @returns {Promise}
	 * @param xpath {string}
	 */
	clickElementByXPath(xpath: string): any;
	/**
	 * Click element by link text
	 * @param text {string}
	 * @returns {Promise}
	 */
	clickElementByLinkText(text: string): any;
	/**
	 * Click a web element. Try this if clickElement() is not working
	 * @param element {WebElement}
	 */
	clickWebElement(element: WebElement): any;
	/**
	 * Fill a <input> or <textarea> with content
	 * @param selector {string}
	 * @param input
	 */
	fillInput(selector: string, input: string | number): any;
	/**
	 * Clear an input
	 * @param selector {string}
	 */
	clearInput(selector: string): any;
	/**
	 * Submit the form containing the element
	 * @param element {WebElement}
	 */
	submitForm(element): any;
	/**
	 * Press key on keyboard (e.g. TAB or ENTER)
	 * @param key {string}
	 */
	pressKey(key: string): any;
	/**
	 * Press a mouse button
	 * @param action {string}
	 */
	pressMouseButton(action: string): any;
	/**
	 * Get a style property of an element (e.g. 'color'). Beware that colors probably will not work
	 * @param element
	 * @param property {string}
	 */
	getStyleValue(element: ElementFinder, property: string): string;
	/**
	 * Get currently used language
	 * @return {!promise.Promise<string>|promise.Promise<string>}
	 */
	getLanguage(): string;
	/**
	 * Get the number of DOM elements by CSS query
	 * @param {string} selector CSS query
	 * @return {promise.Promise<number>} how many elements were found
	 */
	getDomElementsCount(selector: string): any;
	/**
	 * Check if a page is served using the secure HTTPS
	 * @param {string} url if no URL is provided, then the current URL will be used
	 * @returns {Promise<boolean>}
	 */
	isHttps(url?: string);
	/**
	 * Delete characters of an <input> or <textarea> element
	 * @param {string} selector CSS query
	 * @param {number} count how many times to do this. Otherwise, it will be done once.
	 * @returns {Promise<promise.Promise<void>>}
	 */
	deleteCharsFromInput(selector: string, count?: number);
	/**
	 * Press the TAB key
	 * @param {number} count how many times TAB key should be pressed. Otherwise, it will be pressed once.
	 * @returns {promise.Promise<void>}
	 */
	pressTab(count?: number);
	/**
	 * Restart the browser. Beware that you need to call disableAngular() again if your web page is running not Angular.
	 * @returns {promise.Promise<ProtractorBrowser>}
	 */
	restartBrowser();
	/**
	 * Get the underlying ProtractorBrowser if you need to access the Protractor API directly.
	 * @return {ProtractorBrowser}
	 */
	getProtractorBrowser(): ProtractorBrowser;
	/**
	 * Get the underlying ProtractorBy if you need to access the Protractor API directly.
	 * @return {ProtractorBy}
	 */
	getProtractorBy(): ProtractorBy;
	/**
	 * Get the underlying ElementFinder if you need to access the Protractor API directly.
	 * @return {ElementFinder}
	 */
	getProtractorElementFinder(by: any): ElementFinder;
	/**
	 * Get the underlying ElementArrayFinder if you need to access the Protractor API directly.
	 * @return {ElementArrayFinder}
	 */
	getProtractorElementArrayFinder(by: any) : ElementArrayFinder;
}
