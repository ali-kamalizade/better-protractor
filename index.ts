import {browser, by, element, protractor, ProtractorBy} from "protractor"; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
import {Key} from "selenium-webdriver";

/**
 * Provides helper methods which allow for testing common test cases.
 * @see Page Object in Selenium
 * @type BetterProtractorService - If you add a new method here, please add the method signature in index.d.ts!
 */
export class BetterProtractorService {

	/**
	 * @param {boolean} isDisabled if Angular change detection should be disabled
	 */
	constructor(isDisabled: boolean = false){
		if (isDisabled) {
			this.disableAngular();
		}
	}
	/**
	 * Navigate to a route.
	 * @returns {wdpromise.Promise<any>}
	 * @param path {string}
	 */
	navigateToRoute(path: string = '/') {
		return browser.get(path);
	}
	/**
	 * Get an element by its DOM id
	 * @returns {ElementFinder}
	 * @param elementId {string}
	 */
	getDomElementById(elementId: string) {
		return element(by.id(elementId));
	}
	/**
	 * Get an element by its DOM tag
	 * @returns {ElementFinder}
	 * @param elementTag {string}
	 */
	getDomElementByTag(elementTag: string) {
		return element(by.tagName(elementTag));
	}
	/**
	 * Get an element by its XPath
	 * @returns {ElementFinder}
	 * @param xpath {string}
	 */
	getDomElementByXPath(xpath: string) {
		return element(by.xpath(xpath));
	}
	/**
	 * Get an element by CSS query
	 * @returns {ElementFinder}
	 * @param selector {string}
	 */
	getDomElementByCss(selector: string) {
		return element(by.css(selector));
	}
	/**
	 * Get an element
	 * @returns {WebElementPromise}
	 * @param element
	 */
	getElementAsWebElement(element) {
		return element.getWebElement();
	}
	/**
	 * @param selector {string}
	 * @param index {number}
	 * @return {ElementFinder}
	 */
	getDomElementByIndex(selector: string, index: number) {
		return protractor.element.all(by.css(selector)).get(index);
	}
	/**
	 * @param css {string} the CSS selector
	 * @param text {string}
	 */
	getDomElementByText(css: string, text) {
		return element(by.cssContainingText(css, text));
	}
	/**
	 * Fill a <input> or <textarea> with content
	 * @param selector {string}
	 * @param input
	 */
	fillInput(selector: string, input) {
		return this.getDomElementByCss(selector).sendKeys(input);
	}
	/**
	 * Submit the form containing the element
	 * @param element {WebElement}
	 */
	submitForm(element) {
		return element.submit();
	}
	/**
	 * Click a element
	 * @returns {Promise}
	 * @param element
	 */
	clickElement(element) {
		return element.click();
	}
	/**
	 * Click a element by CSS
	 * @returns {Promise}
	 * @param css {string}
	 */
	clickElementByCss(css: string) {
		return this.clickElement(element(by.css(css)));
	}
	/**
	 * Click a element by ID
	 * @returns {Promise}
	 * @param elementId {string}
	 */
	clickElementById(elementId: string) {
		return this.clickElement(element(by.id(elementId)));
	}
	/**
	 * Click a element with an tag
	 * @returns {Promise}
	 * @param elementTag {string}
	 */
	clickElementByTag(elementTag: string) {
		return this.clickElement(element(by.tagName(elementTag)));
	}
	/**
	 * Click a element by XPath
	 * @returns {Promise}
	 * @param xpath {string}
	 */
	clickElementByXPath(xpath: string) {
		return this.clickElement(element(by.xpath(xpath)));
	}
	/**
	 * Click element by link text
	 * @param text {string}
	 * @returns {Promise}
	 */
	clickElementByLinkText(text) {
		return this.clickElement(element(by.linkText(text)));
	}
	/**
	 * Click a web element. Try this if clickElement() is not working
	 * @param element {WebElement}
	 */
	clickWebElement(element) {
		return browser.actions().mouseMove(element).click().perform();
	}
	/**
	 * Press key on keyboard (e.g. TAB or ENTER)
	 * @param key {string}
	 */
	pressKey(key: string) {
		return browser.actions().sendKeys(key).perform();
	}
	/**
	 * Press a mouse button
	 * @param action {string}
	 */
	pressMouseButton(action: string) {
		return browser.actions().click(action).perform();
	}
	/**
	 * Don't let Protractor close the browser after execution
	 * @return {*}
	 */
	pauseBrowser(): any {
		return browser.pause();
	}
	/**
	 * Don't let Protractor close the browser after execution for a specific time. You can use this as an alternative in case pauseBrowser() does not work.
	 * @param time {number} in milliseconds
	 */
	pauseBrowserTemporarily(time: number): any {
		return browser.sleep(time);
	}
	/**
	 * Wait for Angular to be initialized
	 * @return {void|promise.Promise<any>}
	 */
	waitForBrowser(): any {
		return browser.waitForAngular();
	}
	/**
	 * Get the current browser URL
	 * @returns {promise.Promise<string>}
	 * @param useDriver {boolean}
	 */
	getUrl(useDriver: boolean = false)  {
		const usedBrowser = useDriver? browser.driver : browser;
		return usedBrowser.getCurrentUrl()
			.then(
				(url) => {
					return url;
				}
		);
	}
	/**
	 * Check if a element is visible and if it can be selected
	 * @param element
	 * @return {wdpromise.Promise<boolean> | webdriver.promise.Promise.<boolean>}
	 */
	checkIfExists(element)  {
		return element.isPresent();
	}
	/**
	 * Check if a element is visible
	 * @param element
	 * @return {wdpromise.Promise<boolean> | webdriver.promise.Promise.<boolean>}
	 */
	checkIfVisible(element) {
		return element.isDisplayed();
	}
	/**
	 * Get an attribute from a DOM element (e.g. class)
	 * @param element
	 * @param attribute {string} e.g. 'value' (to get input value) or 'class'
	 */
	getAttributeFromDomElement(element, attribute: string) {
		return element.getAttribute(attribute);
	}
	/**
	 * @param contains {string | Array}
	 * @param url {string} if not passed, then current url will be used
	 * @return {boolean}
	 */
	async checkIfRouteContains(contains: string | any [], url: string = undefined) {
		if (!url) {
			url = await this.getUrl();
		}
		if(Array.isArray(contains)) {
			return (contains.indexOf(url) !== -1);
		}
		else {
			return typeof url === 'string' ? (url.indexOf(contains) !== -1) : false;
		}
	}
	/**
	 * Clear an input
	 * @param selector {string}
	 */
	clearInput(selector: string) {
		return this.getDomElementByCss(selector).clear();
	}
	/**
	 * Use this method to set the browser window to a specific size.
	 * If this method crashes the browser, then you need to update with "webdriver-manager update".
	 * @param mobileWidth {number}
	 * @param mobileHeight {number}
	 */
	showMobileView(mobileWidth: number = 360, mobileHeight: number = 640) {
		return browser.driver.manage().window().setSize(mobileWidth, mobileHeight);
	}
	/**
	 * Get height and width of browser window
	 * @return {promise.Promise<ISize>}
	 */
	getWindowSize() {
		return browser.driver.manage().window().getSize().then((size) =>  {
			return size;
		});
	}
	/**
	 * Use this method to maximize the browser window.
	 * If this method crashes the browser, then you need to update with "webdriver-manager update".
	 * @return {promise.Promise<void>}
	 */
	maximizeWindow() {
		return browser.driver.manage().window().maximize();
	}
	/**
	 * Get browser cookies
	 * @returns {promise.Promise<IWebDriverOptionsCookie>}
	 */
	getCookies() {
		return browser.manage().getCookies().then((cookies) => {
			return cookies;
		});
	}
	/**
	 * Get a style property of an element (e.g. 'color')
	 * @param element
	 * @param property {string}
	 */
	getStyleValue(element, property: string) {
		return element.getCssValue(property);
	}
	/**
	 * Get currently used language
	 * @return {!promise.Promise<string>|promise.Promise<string>}
	 */
	getLanguage() {
		return browser.executeScript('return window.navigator.language;');
	}
	/**
	 * Scroll to a DOM element
	 * @param selector {string}
	 * @returns {promise.Promise<void>}
	 */
	scrollToElement(selector: string) {
		return browser.executeScript('document.querySelector("' + selector + '").scrollIntoView({behavior: "smooth"})');
	}
	/**
	 * Get the number of DOM elements by CSS query
	 * @param {string} selector CSS query
	 * @return {promise.Promise<number>} how many elements were found
	 */
	getDomElementsCount(selector: string) {
		return element.all(by.css(selector)).count();
	}
	/**
	 * Delete characters of an <input> or <textarea> element
	 * @param {string} selector CSS query
	 * @param {number} count how many times to do this. Otherwise, it will be done once.
	 * @returns {Promise<promise.Promise<void>>}
	 */
	async deleteCharsFromInput(selector: string, count?: number) {
		this.clickElementByCss(selector);
		if (typeof count === 'number') {
			let temp: number = 0;
			while (temp < count - 1) {
				this.pressKey(Key.BACK_SPACE);
				this.pauseBrowserTemporarily(400);
				temp++;
			}
			return this.pressKey(Key.BACK_SPACE);
		}
		else {
			return this.pressKey(Key.BACK_SPACE);
		}
	}
	/**
	 * Press the TAB key
	 * @param {number} count how many times TAB key should be pressed. Otherwise, it will be pressed once.
	 * @returns {promise.Promise<void>}
	 */
	pressTab(count?: number) {
		if (typeof count === 'number') {
			let temp: number = 0;
			while (temp < count - 1) {
				this.pressKey(Key.TAB);
				this.pauseBrowserTemporarily(400);
				temp++;
			}
			return this.pressKey(Key.TAB);
		}
		else {
			return this.pressKey(Key.TAB);
		}
	}
	/**
	 * Check if a page is served using the secure HTTPS
	 * @param {string} url if no URL is provided, then the current URL will be used
	 * @returns {Promise<boolean>}
	 */
	async isHttps(url?: string) {
		return (url? url : (await this.getUrl())).indexOf('https://') !== -1;
	}
	/**
	 * Restart the browser. Beware that you need to call disableAngular() again if your web page is running not Angular.
	 * @returns {promise.Promise<ProtractorBrowser>}
	 */
	restartBrowser() {
		return browser.restart();
	}
	/**
	 * Refresh current tab
	 * @param {number} timeout
	 * @returns {promise.Promise<any>}
	 */
	refresh(timeout?: number) {
		return browser.refresh(timeout);
	}
	/**
	 * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
	 * @return {promise.Promise<boolean>}
	 */
	disableAngular() {
		return browser.waitForAngularEnabled(false);
	}
	/**
	 * Get the underlying ProtractorBrowser if you need to access the Protractor API directly.
	 * @return {ProtractorBrowser}
	 */
	getProtractorBrowser() {
		return browser;
	}
	/**
	 * Get the underlying ProtractorBy if you need to access the Protractor API directly.
	 * @return {ProtractorBy}
	 */
	getProtractorBy() {
		return by;
	}
	/**
	 * Get the underlying ElementFinder if you need to access the Protractor API directly.
	 * @return {ElementFinder}
	 */
	getProtractorElementFinder(by: any) {
		return element(by);
	}
	/**
	 * Get the underlying ElementArrayFinder if you need to access the Protractor API directly.
	 * @return {ElementArrayFinder}
	 */
	getProtractorElementArrayFinder(by: any) {
		return element.all(by);
	}
}
