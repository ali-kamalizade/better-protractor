// noinspection ES6UnusedImports
import {browser, by, element, ElementFinder, ElementArrayFinder, protractor, ProtractorBy, ProtractorExpectedConditions, ProtractorBrowser,
	Locator} from 'protractor'; // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
// noinspection ES6UnusedImports
import {Key, WebElement, ILocation, promise, WebElementPromise, ISize, IWebDriverOptionsCookie} from 'selenium-webdriver';
import * as fs from 'fs';

/**
 * Provides helper methods which allow for testing common test cases.
 * @see Page Object in Selenium
 * @type BetterProtractorService
 */
export class BetterProtractorService {

	/**
	 * You need to set this in capabilities.chromeOptions.args.
	 * Hides Google Cloud printer notificationa and "Chrome is being controlled by automated software" alert
	 */
	readonly chromeDriverHideMessages = [
		'--disable-infobars',
		'--disable-device-discovery-notifications'
	];
	/**
	 * You need to set this in capabilities.chromeOptions.args.
	 * Disable GPU as it sometimes can lead to unexpected behavior
	 */
	readonly chromeDriverDisableGpu = '--disable-gpu';
	/**
	 * Options for Chrome to be able to run in CI
	 */
	readonly chromeDriverCiOptions = [
		'--headless',
		'--disable-gpu',
		'--no-sandbox'
	];

	/**
	 * @param {boolean} isDisabled if Angular change detection should be disabled
	 */
	constructor(isDisabled: boolean = false){
		if (isDisabled) {
			this.disableAngular();
		}
	}
	/**
	 * Navigate to a route or a URL.
	 * @param path {string}
	 */
	navigateToRoute(path: string = '/') {
		return browser.get(path);
	}
	/**
	 * Get an element by its DOM id
	 * @param elementId {string}
	 */
	getDomElementById(elementId: string) {
		return element(by.id(elementId));
	}
	/**
	 * Get an element by its DOM tag
	 * @param elementTag {string}
	 */
	getDomElementByTag(elementTag: string) {
		return element(by.tagName(elementTag));
	}
	/**
	 * Get an element by its XPath
	 * @param xpath {string}
	 */
	getDomElementByXPath(xpath: string) {
		return element(by.xpath(xpath));
	}
	/**
	 * Get an element by CSS query
	 * @param selector {string}
	 */
	getDomElementByCss(selector: string) {
		return element(by.css(selector));
	}
	/**
	 * Get an element
	 * @param element
	 */
	getElementAsWebElement(element: ElementFinder) {
		return element.getWebElement();
	}
	/**
	 * @param selector {string}
	 * @param index {number}
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
	submitForm(element: WebElement) {
		return element.submit();
	}
	/**
	 * Click a element
	 * @param element {WebElement}
	 */
	clickElement(element: WebElement) {
		return element.click();
	}
	/**
	 * Click a element by CSS
	 * @param css {string}
	 */
	clickElementByCss(css: string) {
		return this.clickElement(this.getDomElementByCss(css));
	}
	/**
	 * Click a element by ID
	 * @param elementId {string}
	 */
	clickElementById(elementId: string) {
		return this.clickElement(this.getDomElementById(elementId));
	}
	/**
	 * Click a element with an tag
	 * @param elementTag {string}
	 */
	clickElementByTag(elementTag: string) {
		return this.clickElement(this.getDomElementByTag(elementTag));
	}
	/**
	 * Click a element by XPath
	 * @param xpath {string}
	 */
	clickElementByXPath(xpath: string) {
		return this.clickElement(this.getDomElementByXPath(xpath));
	}
	/**
	 * Click element by link text
	 * @param text {string}
	 */
	clickElementByLinkText(text) {
		return this.clickElement(element(by.linkText(text)));
	}
	/**
	 * Click a web element. Try this if clickElement() is not working
	 * @param element {WebElement}
	 */
	clickWebElement(element: WebElement) {
		return browser.actions().mouseMove(element).click().perform();
	}
	/**
	 * Hover over an element by CSS
	 * @param css {string}
	 */
	hoverElementByCss(css: string) {
		return browser.actions()
			.mouseMove((this.getDomElementByCss(css)))
			.perform();
	}
	/**
	 * Hover over an element
	 * @param element {WebElement}
	 */
	async hoverElement(element: WebElement) {
		return browser.actions().mouseMove(element).perform();
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
	 * @return {Promise<*>}
	 */
	pauseBrowser(): any {
		return browser.pause();
	}
	/**
	 * Don't let Protractor close the browser after execution for a specific time.
	 * You can use this as an alternative in case pauseBrowser() does not work.
	 * Use this to wait for things to initialize (e.g. animated items).
	 * @param time {number} in milliseconds
	 * @returns {Promise <*>}
	 */
	pauseBrowserTemporarily(time: number): any {
		return browser.sleep(time);
	}
	/**
	 * Wait for Angular to be initialized
	 * @return {promise.Promise<*>}
	 */
	waitForBrowser(): any {
		return browser.waitForAngular();
	}
	/**
	 * Get the current browser URL
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
	 * @param element {ElementFinder}
	 */
	checkIfExists(element: ElementFinder)  {
		return element.isPresent();
	}
	/**
	 * Check if a element is visible
	 * @param element {WebElement}
	 */
	checkIfVisible(element: WebElement) {
		return element.isDisplayed();
	}
	/**
	 * Get an attribute from a DOM element (e.g. class)
	 * @param element {WebElement}
	 * @param attribute {string} e.g. 'value' (to get input value) or 'class'
	 */
	getAttributeFromDomElement(element: WebElement, attribute: string): promise.Promise<string> {
		return element.getAttribute(attribute);
	}
	/**
	 * @param contains {string | Array}
	 * @param url {string} if not passed, then current url will be used
	 */
	async checkIfRouteContains(contains: string | any [], url: string = undefined) {
		if (!url) {
			url = await this.getUrl();
		}
		if (Array.isArray(contains)) {
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
	 */
	getWindowSize() {
		return browser.driver.manage().window().getSize().then((size) =>  {
			return size;
		});
	}
	/**
	 * Use this method to maximize the browser window.
	 * If this method crashes the browser, then you need to update with "webdriver-manager update".
	 */
	maximizeWindow() {
		return browser.driver.manage().window().maximize();
	}
	/**
	 * Get browser cookies
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
	getStyleValue(element: WebElement, property: string) {
		return element.getCssValue(property);
	}
	/**
	 * Get currently used language
	 * @return {!promise.Promise<string>|promise.Promise<string>}
	 */
	getLanguage(): promise.Promise<any> {
		return this.executeScript('return window.navigator.language;');
	}
	/**
	 * Get localStorage item. If none is found, then null is returned.
	 * @param {string} item key in localStorage
	 * @return {!promise.Promise<string>|promise.Promise<string>}
	 */
	getLocalStorageItem(item: string) {
		return this.executeScript('return localStorage.getItem("' + item  + '");');
	}
	/**
	 * Get sessionStorage item. If none is found, then null is returned.
	 * @param {string} item key in sessionStorage
	 * @return {!promise.Promise<string>|promise.Promise<string>}
	 */
	getSessionStorageItem(item: string) {
		return this.executeScript('return sessionStorage.getItem("' + item  + '");');
	}
	/**
	 * Smooth scroll to a DOM element
	 * @param selector {string} CSS query
	 */
	async scrollToElement(selector: string) {
		await this.executeScript(`document.querySelector(${selector}).scrollIntoView({behavior: "smooth"})`);
	}
	/**
	 * Get the number of DOM elements by CSS query
	 * @param {string} selector CSS query
	 */
	getDomElementsCount(selector: string) {
		return element.all(by.css(selector)).count();
	}
	/**
	 * Delete characters of an <input> or <textarea> element
	 * @param {string} selector CSS query
	 * @param {number} count how many times to do this. Otherwise, it will be done once.
	 */
	async deleteCharsFromInput(selector: string, count?: number) {
		await this.clickElementByCss(selector);
		if (typeof count === 'number') {
			let temp: number = 0;
			while (temp < count - 1) {
				await this.pressKey(Key.BACK_SPACE);
				await this.pauseBrowserTemporarily(400);
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
	 */
	async pressTab(count?: number) {
		if (typeof count === 'number') {
			let temp: number = 0;
			while (temp < count - 1) {
				await this.pressKey(Key.TAB);
				await this.pauseBrowserTemporarily(400);
				temp++;
			}
			return this.pressKey(Key.TAB);
		}
		else {
			return this.pressKey(Key.TAB);
		}
	}
	/**
	 * Get the current web page title.
	 * @returns {Promise<string>}
	 */
	getBrowserTitle() {
		return browser.getTitle();
	}
	/**
	 * Close the current window.
	 * @returns {Promise<void>}
	 */
	closeWindow() {
		return browser.close();
	}
	/**
	 * Get the size of an element in px.
	 * @param selector {string} CSS query
	 */
	async getElementSize(selector: string) {
		return this.getDomElementByCss(selector).getSize();
	}
	/**
	 * Represents a library of canned expected conditions that are useful for protractor, especially when dealing with non-angular apps.
	 */
	getProtractorExpectedConditions() {
		return protractor.ExpectedConditions;
	}
	/**
	 * Take a screenshot and save it in the specified directory.
	 * @param {string} filename if not provided, then the browser title + current date will be used
	 * @param {string} directory if not provided, then a directory called better-protractor-screenshots will be created and used for all screenshots
	 */
	async screenshot(filename?: string, directory: string = './better-protractor-screenshots') {
		const fileExtension: string [] = ['.png', '.jpg', '.jpeg', '.tiff'];
		if (!filename) {
			filename = (await this.getBrowserTitle()) + ' -- ' + new Date().toLocaleDateString();
		}
		// delete forbidden characters if present in file name
		const forbiddenChars: string[] = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];
		for (let char of forbiddenChars) {
			if (filename.indexOf(char) > -1) {
				filename = filename.replace(char, '');
			}
		}
		// append default extension if none is set yet
		if (!filename.endsWith(fileExtension[0]) && !filename.endsWith(fileExtension[1]) && !filename.endsWith(fileExtension[2]) && !filename.endsWith(fileExtension[3])) {
			filename += fileExtension[0];
		}
		return browser.takeScreenshot().then((screenshot: string) => {
			// create directory if it does not exist and store screenshot there
			try {
				if (!fs.existsSync(directory)){
					fs.mkdirSync(directory);
				}
				const stream = fs.createWriteStream(directory + '/' + filename);
				stream.write(new Buffer(screenshot, 'base64'));
				stream.end();
			} catch (e) {
				console.error(e);
			}
		});
	}
	/**
	 * Check if a page is served using the secure HTTPS
	 * @param {string} url if no URL is provided, then the current URL will be used
	 */
	async isHttps(url?: string): Promise<boolean> {
		return (url? url : (await this.getUrl())).indexOf('https://') !== -1;
	}
	/**
	 * Execute a script in the browser
	 * @param {string | Function} script
	 * @return {Promise<*>}
	 */
	executeScript(script: string | Function) {
		return browser.executeScript(script);
	}
	/**
	 * Restart the browser. Beware that you need to call disableAngular() again if your web page is running not Angular.
	 */
	restartBrowser() {
		return browser.restart();
	}
	/**
	 * Refresh current tab
	 * @param {number} timeout
	 */
	refresh(timeout?: number) {
		return browser.refresh(timeout);
	}
	/**
	 * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
	 */
	disableAngular() {
		return browser.waitForAngularEnabled(false);
	}
	/**
	 * Display a mouse pointer
	 * @param options
	 */
	async showMousePointer(options?) {
		await this.executeScript(() => {
			const EventSniffer = function () {
				this.history = [];
				this.callbacks = {};
				this.minCacheSize = 100;
				this.maxCacheSize = 500;
			};
			EventSniffer.prototype.handle = function (name, e) {
				if (this.history.indexOf(e) > -1) {
					return;
				}
				this.addToHistory(e);
				this.trigger(name, e);
			};
			EventSniffer.prototype.trigger = function (name, e) {
				if (!this.callbacks[name]) {
					return;
				}
				this.callbacks[name].forEach(function (cb) {
					cb(e);
				});
			};
			EventSniffer.prototype.addToHistory = function (e) {
				if (this.history.length >= this.maxCacheSize) {
					this.history = this.history
						.slice(this.history.length - this.minCacheSize);
				}
				this.history.push(e);
			};
			EventSniffer.prototype.on = function (name, cb) {
				if (!this.callbacks[name]) {
					this.callbacks[name] = [];
					// Add a dummy event listener incase the page hasn't
					document.addEventListener(name, function () {
					});
				}
				this.callbacks[name].push(cb);
			};
			EventSniffer.prototype.install = function () {
				const proto = EventTarget.prototype;
				const oldAEL = proto.addEventListener;
				const self = this;
				proto.addEventListener = function (name) {
					// Add our own event listener first
					oldAEL.call(this, name, function (e) {
						self.handle(name, e);
					});
					// The add the users listener as normal
					return oldAEL.apply(this, arguments);
				};
			};
			const MouseTracker = function () {
				const MOUSE_ID = 'protractor-mouse-tracker';
				this.indicator = document.createElement('div');
				this.indicator.setAttribute('id', MOUSE_ID);
				this.style = document.createElement('style');
				this.style.innerHTML =
					`#${MOUSE_ID} {
						width: 0.5em;
						height: 0.5em;
						background: orange;
						box-shadow: 0 0 0 1px white;
						border-radius: 50%;
						position: absolute;
						top: 0;
						left: 0;
						z-index: 100000;
						pointer-events: none;
						transform: translate(-50%, -50%);
						transition: background-color 0.2s linear;
					}
					#${MOUSE_ID}.mousedown {
						background: rgba(0, 128, 0, 0.5);
					}
					@keyframes mouse-tracker-click {
						to {
							width: 5em;
							height: 5em;
							opacity: 0;
						}
					}
					#${MOUSE_ID} .click {
						width: 0.5em;
						height: 0.5em;
						border: 1px solid rgba(128, 128, 128, 1);
						box-shadow: 0 0 0 1px rgba(256, 256, 256, 1);
						border-radius: 50%;
						position: absolute;
						top: 50%;
						left: 50%;
						pointer-events: none;
						transform: translate(-50%, -50%);
						animation: 1s mouse-tracker-click;
					}`;
			};
			MouseTracker.prototype.move = function (x, y) {
				this.indicator.style.left = x + 'px';
				this.indicator.style.top = y + 'px';
			};
			MouseTracker.prototype.click = function () {
				const click = document.createElement('div');
				click.setAttribute('class', 'click');
				click.addEventListener('animationend', function () {
					click.remove();
				}, false);
				this.indicator.appendChild(click);
			};
			MouseTracker.prototype.mousedown = function () {
				this.indicator.classList.add('mousedown');
			};
			MouseTracker.prototype.mouseup = function () {
				this.indicator.classList.remove('mousedown');
			};
			MouseTracker.prototype.install = function () {
				document.body.appendChild(this.indicator);
				document.head.appendChild(this.style);
			};
			const tracker = new MouseTracker();
			const sniffer = new EventSniffer();
			sniffer.install();
			tracker.install();
			sniffer.on('click', function () {
				tracker.click();
			});
			sniffer.on('mousemove', function (e) {
				tracker.move(e.x, e.y);
			});
			sniffer.on('mousedown', function () {
				tracker.mousedown();
			});
			sniffer.on('mouseup', function () {
				tracker.mouseup();
			});
		});
	}
	/**
	 * Hide mouse pointer displayed with @link {showMouse()}
	 */
	public async hideMouse() {
		await this.executeScript(() => {
			document.getElementById('protractor-mouse-tracker').remove();
		});
	}
	/**
	 * Drag an element to a specified location or element.
	 * If you provide a WebElement, then the location will be used to calculate the offset.
	 */
	public async dragElement(element: WebElement, target: WebElement | ILocation, waitTime: number = 0) {
		const targetCoordinates = this.isILocation(target) ? target : await this.getOffset(element, target);
		await this.hoverElement(element);
		// focus element
		await browser.driver.actions()
			.mouseDown()
			.perform();
		await this.pauseBrowserTemporarily(waitTime);
		// drag element
		await browser.driver.actions()
			.mouseMove(targetCoordinates)
			.perform();
		// let go of mouse
		await browser.driver.actions()
			.mouseUp()
			.perform();
	}

	/**
	 * @param element {ElementFinder} should contain the text to be selected
	 */
	async selectText(element: ElementFinder) {
		const webElem = await element.getWebElement();
		await browser.executeScript(function (args) {
			if (!args) {
				return null;
			}
			const range = document.createRange();
			range.selectNode(args.firstChild);
			const selection = window.getSelection();
			selection.removeAllRanges();
			selection.addRange(range);
		}, webElem);
	}

	/**
	 * @returns {Promise<string>} the selected text
	 */
	getSelectedText() {
		return this.executeScript(function () {
			const selection = window.getSelection();
			const node = selection.focusNode;
			if (!node) {
				return null;
			}
			return node.nodeValue ?
				node.nodeValue.substring(selection.baseOffset, selection.focusOffset) : node['innerText'];
		}) as any as Promise<string>;
	}

	/**
	 * Get the underlying ProtractorBrowser if you need to access the Protractor API directly.
	 * @return {ProtractorBrowser}
	 */
	getProtractorBrowser() {
		return browser;
	}

	/**
	 * Get the underlying ElementArrayFinder if you need to access the Protractor API directly.
	 */
	getProtractorElementArrayFinder(by: Locator) {
		return element.all(by);
	}

	private isILocation(element: ILocation | WebElement): element is ILocation {
		return (element as ILocation).x !== undefined && (element as ILocation).y !== undefined;
	}

	private async getOffset(source: WebElement, target: WebElement) {
		const sourceCoordinates = await source.getLocation();
		const targetCoordinates = await target.getLocation();
		const sourceDimensions = await source.getSize();
		const targetDimensions = await target.getSize();
		return {
			x: Math.round(targetCoordinates.x - sourceCoordinates.x + 0.5 * (targetDimensions.width - sourceDimensions.width)),
			y: Math.round(targetCoordinates.y - sourceCoordinates.y + 0.5 * (targetDimensions.height - sourceDimensions.height))
		};
	}

}
