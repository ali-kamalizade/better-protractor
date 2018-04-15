import {browser, by, element, protractor} from "protractor"; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!

/**
 * Provides helper methods which allow for testing common test cases.
 * @see Page Object in Selenium
 * @type BetterProtractorService - If you add a new method here, please add the method signature in index.d.ts!
 */
export class BetterProtractorService {

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
	};
	/**
	 * Get an element by its DOM id
	 * @returns {ElementFinder}
	 * @param elementId {string}
	 */
	getDomElementById(elementId: string) {
		return element(by.id(elementId));
	};
	/**
	 * Get an element by its DOM tag
	 * @returns {ElementFinder}
	 * @param elementTag {string}
	 */
	getDomElementByTag(elementTag: string) {
		return element(by.tagName(elementTag));
	};
	/**
	 * Get an element by its XPath
	 * @returns {ElementFinder}
	 * @param xpath {string}
	 */
	getDomElementByXPath(xpath: string) {
		return element(by.xpath(xpath));
	};
	/**
	 * Get an element by CSS query
	 * @returns {ElementFinder}
	 * @param selector {string}
	 */
	getDomElementByCss(selector) {
		return element(by.css(selector));
	};
	/**
	 * Get an element
	 * @returns {WebElementPromise}
	 * @param element
	 */
	getElementAsWebElement(element) {
		return element.getWebElement();
	};
	/**
	 * @param selector {string}
	 * @param index {number}
	 * @return {ElementFinder}
	 */
	getDomElementByIndex(selector, index) {
		return protractor.element.all(by.css(selector)).get(index);
	};
	/**
	 * @param css {string} the CSS selector
	 * @param text {string}
	 */
	getDomElementByText(css, text) {
		return element(by.cssContainingText(css, text));
	};
	/**
	 * Fill a <input> or <textarea> with content
	 * @param selector {string}
	 * @param input
	 */
	fillInput(selector, input) {
		return this.getDomElementByCss(selector).sendKeys(input);
	};
	/**
	 * Submit the form containing the element
	 * @param element {WebElement}
	 */
	submitForm(element) {
		return element.submit();
	};
	/**
	 * Click a element
	 * @returns {Promise}
	 * @param element
	 */
	clickElement(element) {
		return element.click();
	};
	/**
	 * Click a element by CSS
	 * @returns {Promise}
	 * @param css {string}
	 */
	clickElementByCss(css) {
		return this.clickElement(element(by.css(css)));
	};
	/**
	 * Click a element by ID
	 * @returns {Promise}
	 * @param elementId {string}
	 */
	clickElementById(elementId) {
		return this.clickElement(element(by.id(elementId)));
	};
	/**
	 * Click a element with an tag
	 * @returns {Promise}
	 * @param elementTag {string}
	 */
	clickElementByTag(elementTag) {
		return this.clickElement(element(by.tagName(elementTag)));
	};
	/**
	 * Click a element by XPath
	 * @returns {Promise}
	 * @param xpath {string}
	 */
	clickElementByXPath(xpath) {
		return this.clickElement(element(by.xpath(xpath)));
	};
	/**
	 * Click element by link text
	 * @param text {string}
	 * @returns {Promise}
	 */
	clickElementByLinkText(text) {
		return this.clickElement(element(by.linkText(text)));
	};
	/**
	 * Click a web element. Try this if clickElement() is not working
	 * @param element {WebElement}
	 */
	clickWebElement(element) {
		return browser.actions().mouseMove(element).click().perform();
	};
	/**
	 * Press key on keyboard (e.g. TAB or ENTER)
	 * @param key {string}
	 */
	pressKey(key) {
		return browser.actions().sendKeys(key).perform();
	};
	/**
	 * Press a mouse button
	 * @param action {string}
	 */
	pressMouseButton(action) {
		return browser.actions().click(action).perform();
	};
	/**
	 * Don't let Protractor close the browser after execution
	 * @return {*}
	 */
	pauseBrowser() {
		return browser.pause();
	};
	/**
	 * Don't let Protractor close the browser after execution for a specific time. You can use this as an alternative in case pauseBrowser() does not work.
	 * @param time {number} in milliseconds
	 */
	pauseBrowserTemporarily(time) {
		return browser.sleep(time);
	};
	/**
	 * Wait for Angular to be initialized
	 * @return {void|promise.Promise<any>}
	 */
	waitForBrowser() {
		return browser.waitForAngular();
	};
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
	};
	/**
	 * Check if a element is visible and if it can be selected
	 * @param element
	 * @return {wdpromise.Promise<boolean> | webdriver.promise.Promise.<boolean>}
	 */
	checkIfExists(element)  {
		return element.isPresent();
	};
	/**
	 * Check if a element is visible
	 * @param element
	 * @return {wdpromise.Promise<boolean> | webdriver.promise.Promise.<boolean>}
	 */
	checkIfVisible(element) {
		return element.isDisplayed();
	};
	/**
	 * Get an attribute from a DOM element (e.g. class)
	 * @param element
	 * @param attribute {string} e.g. 'value' (to get input value) or 'class'
	 */
	getAttributeFromDomElement(element, attribute: string) {
		return element.getAttribute(attribute);
	};
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
			// TODO check if this works
			return (contains.indexOf(url) !== -1);
		}
		else {
			return typeof url === 'string' ? (url.indexOf(contains) !== -1) : false;
		}
	};
	/**
	 * Clear an input
	 * @param selector {string}
	 */
	clearInput(selector: string) {
		return this.getDomElementByCss(selector).clear();
	};
	/**
	 * Use this method to set the browser window to a specific size.
	 * If this method crashes the browser, then you need to update with "webdriver-manager update".
	 * @param mobileWidth {number}
	 * @param mobileHeight {number}
	 */
	showMobileView(mobileWidth: number = 360, mobileHeight: number = 640) {
		return browser.driver.manage().window().setSize(mobileWidth, mobileHeight);
	};
	/**
	 * Get height and width of browser window
	 * @return {promise.Promise<ISize>}
	 */
	getWindowSize() {
		return browser.driver.manage().window().getSize().then((size) =>  {
			return size;
		});
	};
	/**
	 * Use this method to maximize the browser window.
	 * If this method crashes the browser, then you need to update with "webdriver-manager update".
	 * @return {promise.Promise<void>}
	 */
	maximizeWindow() {
		return browser.driver.manage().window().maximize();
	};
	/**
	 * Get browser cookies
	 * @returns {promise.Promise<IWebDriverOptionsCookie>}
	 */
	getCookies() {
		return browser.manage().getCookies().then((cookies) => {
			return cookies;
		});
	};
	/**
	 * Get a style property of an element (e.g. 'color')
	 * @param element
	 * @param property {string}
	 */
	getStyleValue(element, property) {
		return element.getCssValue(property);
	};

	/**
	 * Get currently used language
	 * @return {!promise.Promise<string>|promise.Promise<string>}
	 */
	getLanguage() {
		return browser.executeScript('return window.navigator.language;');
	};
	/**
	 * Scroll to a DOM element
	 * @param selector
	 * @returns {promise.Promise<void>}
	 */
	scrollToElement(selector) {
		return browser.executeScript('document.querySelector(' + selector + ').scrollIntoView()');
	};
	/**
	 * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
	 * @return {promise.Promise<boolean>}
	 */
	disableAngular() {
		return browser.waitForAngularEnabled(false);
	};
}