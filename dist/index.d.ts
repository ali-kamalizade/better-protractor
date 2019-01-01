import { ElementFinder, ElementArrayFinder, ProtractorExpectedConditions, ProtractorBrowser, Locator } from 'protractor';
import { WebElement, ILocation, promise, WebElementPromise, ISize, IWebDriverOptionsCookie } from 'selenium-webdriver';
/**
 * Provides helper methods which allow for testing common test cases.
 * @see Page Object in Selenium
 * @type BetterProtractorService
 */
export declare class BetterProtractorService {
    /**
     * You need to set this in capabilities.chromeOptions.args.
     * Hides Google Cloud printer notificationa and "Chrome is being controlled by automated software" alert
     */
    readonly chromeDriverHideMessages: string[];
    /**
     * You need to set this in capabilities.chromeOptions.args.
     * Disable GPU as it sometimes can lead to unexpected behavior
     */
    readonly chromeDriverDisableGpu = "--disable-gpu";
    /**
     * Options for Chrome to be able to run in CI
     */
    readonly chromeDriverCiOptions: string[];
    /**
     * @param {boolean} isDisabled if Angular change detection should be disabled
     */
    constructor(isDisabled?: boolean);
    /**
     * Navigate to a route or a URL.
     * @param path {string}
     */
    navigateToRoute(path?: string): promise.Promise<any>;
    /**
     * Get an element by its DOM id
     * @param elementId {string}
     */
    getDomElementById(elementId: string): ElementFinder;
    /**
     * Get an element by its DOM tag
     * @param elementTag {string}
     */
    getDomElementByTag(elementTag: string): ElementFinder;
    /**
     * Get an element by its XPath
     * @param xpath {string}
     */
    getDomElementByXPath(xpath: string): ElementFinder;
    /**
     * Get an element by CSS query
     * @param selector {string}
     */
    getDomElementByCss(selector: string): ElementFinder;
    /**
     * Get an element
     * @param element
     */
    getElementAsWebElement(element: ElementFinder): WebElementPromise;
    /**
     * @param selector {string}
     * @param index {number}
     */
    getDomElementByIndex(selector: string, index: number): ElementFinder;
    /**
     * @param css {string} the CSS selector
     * @param text {string}
     */
    getDomElementByText(css: string, text: any): ElementFinder;
    /**
     * Fill a <input> or <textarea> with content
     * @param selector {string}
     * @param input
     */
    fillInput(selector: string, input: any): promise.Promise<void>;
    /**
     * Submit the form containing the element
     * @param element {WebElement}
     */
    submitForm(element: WebElement): promise.Promise<void>;
    /**
     * Click a element
     * @param element {WebElement}
     */
    clickElement(element: WebElement): promise.Promise<void>;
    /**
     * Click a element by CSS
     * @param css {string}
     */
    clickElementByCss(css: string): promise.Promise<void>;
    /**
     * Click a element by ID
     * @param elementId {string}
     */
    clickElementById(elementId: string): promise.Promise<void>;
    /**
     * Click a element with an tag
     * @param elementTag {string}
     */
    clickElementByTag(elementTag: string): promise.Promise<void>;
    /**
     * Click a element by XPath
     * @param xpath {string}
     */
    clickElementByXPath(xpath: string): promise.Promise<void>;
    /**
     * Click element by link text
     * @param text {string}
     */
    clickElementByLinkText(text: any): promise.Promise<void>;
    /**
     * Click a web element. Try this if clickElement() is not working
     * @param element {WebElement}
     */
    clickWebElement(element: WebElement): promise.Promise<void>;
    /**
     * Hover over an element by CSS
     * @param css {string}
     */
    hoverElementByCss(css: string): promise.Promise<void>;
    /**
     * Hover over an element
     * @param element {WebElement}
     */
    hoverElement(element: WebElement): Promise<void>;
    /**
     * Press key on keyboard (e.g. TAB or ENTER)
     * @param key {string}
     */
    pressKey(key: string): promise.Promise<void>;
    /**
     * Press a mouse button
     * @param action {string}
     */
    pressMouseButton(action: string): promise.Promise<void>;
    /**
     * Don't let Protractor close the browser after execution
     * @return {Promise<*>}
     */
    pauseBrowser(): any;
    /**
     * Don't let Protractor close the browser after execution for a specific time.
     * You can use this as an alternative in case pauseBrowser() does not work.
     * Use this to wait for things to initialize (e.g. animated items).
     * @param time {number} in milliseconds
     * @returns {Promise <*>}
     */
    pauseBrowserTemporarily(time: number): any;
    /**
     * Wait for Angular to be initialized
     * @return {promise.Promise<*>}
     */
    waitForBrowser(): any;
    /**
     * Get the current browser URL
     * @param useDriver {boolean}
     */
    getUrl(useDriver?: boolean): promise.Promise<string>;
    /**
     * Check if a element is visible and if it can be selected
     * @param element {ElementFinder}
     */
    checkIfExists(element: ElementFinder): promise.Promise<boolean>;
    /**
     * Check if a element is visible
     * @param element {WebElement}
     */
    checkIfVisible(element: WebElement): promise.Promise<boolean>;
    /**
     * Get an attribute from a DOM element (e.g. class)
     * @param element {WebElement}
     * @param attribute {string} e.g. 'value' (to get input value) or 'class'
     */
    getAttributeFromDomElement(element: WebElement, attribute: string): promise.Promise<string>;
    /**
     * @param contains {string | Array}
     * @param url {string} if not passed, then current url will be used
     */
    checkIfRouteContains(contains: string | any[], url?: string): Promise<boolean>;
    /**
     * Clear an input
     * @param selector {string}
     */
    clearInput(selector: string): promise.Promise<void>;
    /**
     * Use this method to set the browser window to a specific size.
     * If this method crashes the browser, then you need to update with "webdriver-manager update".
     * @param mobileWidth {number}
     * @param mobileHeight {number}
     */
    showMobileView(mobileWidth?: number, mobileHeight?: number): promise.Promise<void>;
    /**
     * Get height and width of browser window
     */
    getWindowSize(): promise.Promise<ISize>;
    /**
     * Use this method to maximize the browser window.
     * If this method crashes the browser, then you need to update with "webdriver-manager update".
     */
    maximizeWindow(): promise.Promise<void>;
    /**
     * Get browser cookies
     */
    getCookies(): promise.Promise<IWebDriverOptionsCookie[]>;
    /**
     * Get a style property of an element (e.g. 'color')
     * @param element
     * @param property {string}
     */
    getStyleValue(element: WebElement, property: string): promise.Promise<string>;
    /**
     * Get currently used language
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    getLanguage(): promise.Promise<any>;
    /**
     * Get localStorage item. If none is found, then null is returned.
     * @param {string} item key in localStorage
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    getLocalStorageItem(item: string): promise.Promise<{}>;
    /**
     * Get sessionStorage item. If none is found, then null is returned.
     * @param {string} item key in sessionStorage
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    getSessionStorageItem(item: string): promise.Promise<{}>;
    /**
     * Smooth scroll to a DOM element
     * @param selector {string} CSS query
     */
    scrollToElement(selector: string): Promise<void>;
    /**
     * Get the number of DOM elements by CSS query
     * @param {string} selector CSS query
     */
    getDomElementsCount(selector: string): promise.Promise<number>;
    /**
     * Delete characters of an <input> or <textarea> element
     * @param {string} selector CSS query
     * @param {number} count how many times to do this. Otherwise, it will be done once.
     */
    deleteCharsFromInput(selector: string, count?: number): Promise<void>;
    /**
     * Press the TAB key
     * @param {number} count how many times TAB key should be pressed. Otherwise, it will be pressed once.
     */
    pressTab(count?: number): Promise<void>;
    /**
     * Get the current web page title.
     * @returns {Promise<string>}
     */
    getBrowserTitle(): promise.Promise<string>;
    /**
     * Close the current window.
     * @returns {Promise<void>}
     */
    closeWindow(): promise.Promise<void>;
    /**
     * Get the size of an element in px.
     * @param selector {string} CSS query
     */
    getElementSize(selector: string): Promise<ISize>;
    /**
     * Represents a library of canned expected conditions that are useful for protractor, especially when dealing with non-angular apps.
     */
    getProtractorExpectedConditions(): ProtractorExpectedConditions;
    /**
     * Take a screenshot and save it in the specified directory.
     * @param {string} filename if not provided, then the browser title + current date will be used
     * @param {string} directory if not provided, then a directory called better-protractor-screenshots will be created and used for all screenshots
     */
    screenshot(filename?: string, directory?: string): Promise<void>;
    /**
     * Check if a page is served using the secure HTTPS
     * @param {string} url if no URL is provided, then the current URL will be used
     */
    isHttps(url?: string): Promise<boolean>;
    /**
     * Execute a script in the browser
     * @param {string | Function} script
     * @return {Promise<*>}
     */
    executeScript(script: string | Function): promise.Promise<{}>;
    /**
     * Restart the browser. Beware that you need to call disableAngular() again if your web page is running not Angular.
     */
    restartBrowser(): promise.Promise<ProtractorBrowser>;
    /**
     * Refresh current tab
     * @param {number} timeout
     */
    refresh(timeout?: number): promise.Promise<any>;
    /**
     * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
     */
    disableAngular(): promise.Promise<boolean>;
    /**
     * Display a mouse pointer
     * @param options
     */
    showMousePointer(options?: any): Promise<void>;
    /**
     * Hide mouse pointer displayed with @link {showMouse()}
     */
    hideMouse(): Promise<void>;
    /**
     * Drag an element to a specified location or element.
     * If you provide a WebElement, then the location will be used to calculate the offset.
     */
    dragElement(element: WebElement, target: WebElement | ILocation, waitTime?: number): Promise<void>;
    /**
     * @param element {ElementFinder} should contain the text to be selected
     */
    selectText(element: ElementFinder): Promise<void>;
    /**
     * @returns {Promise<string>} the selected text
     */
    getSelectedText(): Promise<string>;
    /**
     * Get the underlying ProtractorBrowser if you need to access the Protractor API directly.
     * @return {ProtractorBrowser}
     */
    getProtractorBrowser(): ProtractorBrowser;
    /**
     * Get the underlying ElementArrayFinder if you need to access the Protractor API directly.
     */
    getProtractorElementArrayFinder(by: Locator): ElementArrayFinder;
    private isILocation;
    private getOffset;
}
