"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
// noinspection ES6UnusedImports
var protractor_1 = require("protractor"); // TODO DO NOT REMOVE THIS, YOU NEED IN THIS IN EVERY SPEC!
// noinspection ES6UnusedImports
var selenium_webdriver_1 = require("selenium-webdriver");
var fs = require("fs");
/**
 * Provides helper methods which allow for testing common test cases.
 * @see Page Object in Selenium
 * @type BetterProtractorService
 */
var BetterProtractorService = /** @class */ (function () {
    /**
     * @param {boolean} isDisabled if Angular change detection should be disabled
     */
    function BetterProtractorService(isDisabled) {
        if (isDisabled === void 0) { isDisabled = false; }
        /**
         * You need to set this in capabilities.chromeOptions.args.
         * Hides Google Cloud printer notificationa and "Chrome is being controlled by automated software" alert
         */
        this.chromeDriverHideMessages = [
            '--disable-infobars',
            '--disable-device-discovery-notifications'
        ];
        /**
         * You need to set this in capabilities.chromeOptions.args.
         * Disable GPU as it sometimes can lead to unexpected behavior
         */
        this.chromeDriverDisableGpu = '--disable-gpu';
        /**
         * Options for Chrome to be able to run in CI
         */
        this.chromeDriverCiOptions = [
            '--headless',
            '--disable-gpu',
            '--no-sandbox'
        ];
        if (isDisabled) {
            this.disableAngular();
        }
    }
    /**
     * Navigate to a route or a URL.
     * @param path {string}
     */
    BetterProtractorService.prototype.navigateToRoute = function (path) {
        if (path === void 0) { path = '/'; }
        return protractor_1.browser.get(path);
    };
    /**
     * Get an element by its DOM id
     * @param elementId {string}
     */
    BetterProtractorService.prototype.getDomElementById = function (elementId) {
        return protractor_1.element(protractor_1.by.id(elementId));
    };
    /**
     * Get an element by its DOM tag
     * @param elementTag {string}
     */
    BetterProtractorService.prototype.getDomElementByTag = function (elementTag) {
        return protractor_1.element(protractor_1.by.tagName(elementTag));
    };
    /**
     * Get an element by its XPath
     * @param xpath {string}
     */
    BetterProtractorService.prototype.getDomElementByXPath = function (xpath) {
        return protractor_1.element(protractor_1.by.xpath(xpath));
    };
    /**
     * Get an element by CSS query
     * @param selector {string}
     */
    BetterProtractorService.prototype.getDomElementByCss = function (selector) {
        return protractor_1.element(protractor_1.by.css(selector));
    };
    /**
     * Get an element
     * @param element
     */
    BetterProtractorService.prototype.getElementAsWebElement = function (element) {
        return element.getWebElement();
    };
    /**
     * @param selector {string}
     * @param index {number}
     */
    BetterProtractorService.prototype.getDomElementByIndex = function (selector, index) {
        return protractor_1.protractor.element.all(protractor_1.by.css(selector)).get(index);
    };
    /**
     * @param css {string} the CSS selector
     * @param text {string}
     */
    BetterProtractorService.prototype.getDomElementByText = function (css, text) {
        return protractor_1.element(protractor_1.by.cssContainingText(css, text));
    };
    /**
     * Fill a <input> or <textarea> with content
     * @param selector {string}
     * @param input
     */
    BetterProtractorService.prototype.fillInput = function (selector, input) {
        return this.getDomElementByCss(selector).sendKeys(input);
    };
    /**
     * Submit the form containing the element
     * @param element {WebElement}
     */
    BetterProtractorService.prototype.submitForm = function (element) {
        return element.submit();
    };
    /**
     * Click a element
     * @param element {WebElement}
     */
    BetterProtractorService.prototype.clickElement = function (element) {
        return element.click();
    };
    /**
     * Click a element by CSS
     * @param css {string}
     */
    BetterProtractorService.prototype.clickElementByCss = function (css) {
        return this.clickElement(this.getDomElementByCss(css));
    };
    /**
     * Click a element by ID
     * @param elementId {string}
     */
    BetterProtractorService.prototype.clickElementById = function (elementId) {
        return this.clickElement(this.getDomElementById(elementId));
    };
    /**
     * Click a element with an tag
     * @param elementTag {string}
     */
    BetterProtractorService.prototype.clickElementByTag = function (elementTag) {
        return this.clickElement(this.getDomElementByTag(elementTag));
    };
    /**
     * Click a element by XPath
     * @param xpath {string}
     */
    BetterProtractorService.prototype.clickElementByXPath = function (xpath) {
        return this.clickElement(this.getDomElementByXPath(xpath));
    };
    /**
     * Click element by link text
     * @param text {string}
     */
    BetterProtractorService.prototype.clickElementByLinkText = function (text) {
        return this.clickElement(protractor_1.element(protractor_1.by.linkText(text)));
    };
    /**
     * Click a web element. Try this if clickElement() is not working
     * @param element {WebElement}
     */
    BetterProtractorService.prototype.clickWebElement = function (element) {
        return protractor_1.browser.actions().mouseMove(element).click().perform();
    };
    /**
     * Hover over an element by CSS
     * @param css {string}
     */
    BetterProtractorService.prototype.hoverElementByCss = function (css) {
        return protractor_1.browser.actions()
            .mouseMove((this.getDomElementByCss(css)))
            .perform();
    };
    /**
     * Hover over an element
     * @param element {WebElement}
     */
    BetterProtractorService.prototype.hoverElement = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, protractor_1.browser.actions().mouseMove(element).perform()];
            });
        });
    };
    /**
     * Press key on keyboard (e.g. TAB or ENTER)
     * @param key {string}
     */
    BetterProtractorService.prototype.pressKey = function (key) {
        return protractor_1.browser.actions().sendKeys(key).perform();
    };
    /**
     * Press a mouse button
     * @param action {string}
     */
    BetterProtractorService.prototype.pressMouseButton = function (action) {
        return protractor_1.browser.actions().click(action).perform();
    };
    /**
     * Don't let Protractor close the browser after execution
     * @return {Promise<*>}
     */
    BetterProtractorService.prototype.pauseBrowser = function () {
        return protractor_1.browser.pause();
    };
    /**
     * Don't let Protractor close the browser after execution for a specific time.
     * You can use this as an alternative in case pauseBrowser() does not work.
     * Use this to wait for things to initialize (e.g. animated items).
     * @param time {number} in milliseconds
     * @returns {Promise <*>}
     */
    BetterProtractorService.prototype.pauseBrowserTemporarily = function (time) {
        return protractor_1.browser.sleep(time);
    };
    /**
     * Wait for Angular to be initialized
     * @return {promise.Promise<*>}
     */
    BetterProtractorService.prototype.waitForBrowser = function () {
        return protractor_1.browser.waitForAngular();
    };
    /**
     * Get the current browser URL
     * @param useDriver {boolean}
     */
    BetterProtractorService.prototype.getUrl = function (useDriver) {
        if (useDriver === void 0) { useDriver = false; }
        var usedBrowser = useDriver ? protractor_1.browser.driver : protractor_1.browser;
        return usedBrowser.getCurrentUrl()
            .then(function (url) {
            return url;
        });
    };
    /**
     * Check if a element is visible and if it can be selected
     * @param element {ElementFinder}
     */
    BetterProtractorService.prototype.checkIfExists = function (element) {
        return element.isPresent();
    };
    /**
     * Check if a element is visible
     * @param element {WebElement}
     */
    BetterProtractorService.prototype.checkIfVisible = function (element) {
        return element.isDisplayed();
    };
    /**
     * Get an attribute from a DOM element (e.g. class)
     * @param element {WebElement}
     * @param attribute {string} e.g. 'value' (to get input value) or 'class'
     */
    BetterProtractorService.prototype.getAttributeFromDomElement = function (element, attribute) {
        return element.getAttribute(attribute);
    };
    /**
     * @param contains {string | Array}
     * @param url {string} if not passed, then current url will be used
     */
    BetterProtractorService.prototype.checkIfRouteContains = function (contains, url) {
        if (url === void 0) { url = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!url) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getUrl()];
                    case 1:
                        url = _a.sent();
                        _a.label = 2;
                    case 2:
                        if (Array.isArray(contains)) {
                            return [2 /*return*/, (contains.indexOf(url) !== -1)];
                        }
                        else {
                            return [2 /*return*/, typeof url === 'string' ? (url.indexOf(contains) !== -1) : false];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Clear an input
     * @param selector {string}
     */
    BetterProtractorService.prototype.clearInput = function (selector) {
        return this.getDomElementByCss(selector).clear();
    };
    /**
     * Use this method to set the browser window to a specific size.
     * If this method crashes the browser, then you need to update with "webdriver-manager update".
     * @param mobileWidth {number}
     * @param mobileHeight {number}
     */
    BetterProtractorService.prototype.showMobileView = function (mobileWidth, mobileHeight) {
        if (mobileWidth === void 0) { mobileWidth = 360; }
        if (mobileHeight === void 0) { mobileHeight = 640; }
        return protractor_1.browser.driver.manage().window().setSize(mobileWidth, mobileHeight);
    };
    /**
     * Get height and width of browser window
     */
    BetterProtractorService.prototype.getWindowSize = function () {
        return protractor_1.browser.driver.manage().window().getSize().then(function (size) {
            return size;
        });
    };
    /**
     * Use this method to maximize the browser window.
     * If this method crashes the browser, then you need to update with "webdriver-manager update".
     */
    BetterProtractorService.prototype.maximizeWindow = function () {
        return protractor_1.browser.driver.manage().window().maximize();
    };
    /**
     * Get browser cookies
     */
    BetterProtractorService.prototype.getCookies = function () {
        return protractor_1.browser.manage().getCookies().then(function (cookies) {
            return cookies;
        });
    };
    /**
     * Get a style property of an element (e.g. 'color')
     * @param element
     * @param property {string}
     */
    BetterProtractorService.prototype.getStyleValue = function (element, property) {
        return element.getCssValue(property);
    };
    /**
     * Get currently used language
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    BetterProtractorService.prototype.getLanguage = function () {
        return this.executeScript('return window.navigator.language;');
    };
    /**
     * Get localStorage item. If none is found, then null is returned.
     * @param {string} item key in localStorage
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    BetterProtractorService.prototype.getLocalStorageItem = function (item) {
        return this.executeScript('return localStorage.getItem("' + item + '");');
    };
    /**
     * Get sessionStorage item. If none is found, then null is returned.
     * @param {string} item key in sessionStorage
     * @return {!promise.Promise<string>|promise.Promise<string>}
     */
    BetterProtractorService.prototype.getSessionStorageItem = function (item) {
        return this.executeScript('return sessionStorage.getItem("' + item + '");');
    };
    /**
     * Smooth scroll to a DOM element
     * @param selector {string} CSS query
     */
    BetterProtractorService.prototype.scrollToElement = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeScript("document.querySelector(" + selector + ").scrollIntoView({behavior: \"smooth\"})")];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Get the number of DOM elements by CSS query
     * @param {string} selector CSS query
     */
    BetterProtractorService.prototype.getDomElementsCount = function (selector) {
        return protractor_1.element.all(protractor_1.by.css(selector)).count();
    };
    /**
     * Delete characters of an <input> or <textarea> element
     * @param {string} selector CSS query
     * @param {number} count how many times to do this. Otherwise, it will be done once.
     */
    BetterProtractorService.prototype.deleteCharsFromInput = function (selector, count) {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.clickElementByCss(selector)];
                    case 1:
                        _a.sent();
                        if (!(typeof count === 'number')) return [3 /*break*/, 6];
                        temp = 0;
                        _a.label = 2;
                    case 2:
                        if (!(temp < count - 1)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.pressKey(selenium_webdriver_1.Key.BACK_SPACE)];
                    case 3:
                        _a.sent();
                        return [4 /*yield*/, this.pauseBrowserTemporarily(400)];
                    case 4:
                        _a.sent();
                        temp++;
                        return [3 /*break*/, 2];
                    case 5: return [2 /*return*/, this.pressKey(selenium_webdriver_1.Key.BACK_SPACE)];
                    case 6: return [2 /*return*/, this.pressKey(selenium_webdriver_1.Key.BACK_SPACE)];
                }
            });
        });
    };
    /**
     * Press the TAB key
     * @param {number} count how many times TAB key should be pressed. Otherwise, it will be pressed once.
     */
    BetterProtractorService.prototype.pressTab = function (count) {
        return __awaiter(this, void 0, void 0, function () {
            var temp;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(typeof count === 'number')) return [3 /*break*/, 5];
                        temp = 0;
                        _a.label = 1;
                    case 1:
                        if (!(temp < count - 1)) return [3 /*break*/, 4];
                        return [4 /*yield*/, this.pressKey(selenium_webdriver_1.Key.TAB)];
                    case 2:
                        _a.sent();
                        return [4 /*yield*/, this.pauseBrowserTemporarily(400)];
                    case 3:
                        _a.sent();
                        temp++;
                        return [3 /*break*/, 1];
                    case 4: return [2 /*return*/, this.pressKey(selenium_webdriver_1.Key.TAB)];
                    case 5: return [2 /*return*/, this.pressKey(selenium_webdriver_1.Key.TAB)];
                }
            });
        });
    };
    /**
     * Get the current web page title.
     * @returns {Promise<string>}
     */
    BetterProtractorService.prototype.getBrowserTitle = function () {
        return protractor_1.browser.getTitle();
    };
    /**
     * Close the current window.
     * @returns {Promise<void>}
     */
    BetterProtractorService.prototype.closeWindow = function () {
        return protractor_1.browser.close();
    };
    /**
     * Get the size of an element in px.
     * @param selector {string} CSS query
     */
    BetterProtractorService.prototype.getElementSize = function (selector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, this.getDomElementByCss(selector).getSize()];
            });
        });
    };
    /**
     * Represents a library of canned expected conditions that are useful for protractor, especially when dealing with non-angular apps.
     */
    BetterProtractorService.prototype.getProtractorExpectedConditions = function () {
        return protractor_1.protractor.ExpectedConditions;
    };
    /**
     * Take a screenshot and save it in the specified directory.
     * @param {string} filename if not provided, then the browser title + current date will be used
     * @param {string} directory if not provided, then a directory called better-protractor-screenshots will be created and used for all screenshots
     */
    BetterProtractorService.prototype.screenshot = function (filename, directory) {
        if (directory === void 0) { directory = './better-protractor-screenshots'; }
        return __awaiter(this, void 0, void 0, function () {
            var fileExtension, forbiddenChars, _i, forbiddenChars_1, char;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileExtension = ['.png', '.jpg', '.jpeg', '.tiff'];
                        if (!!filename) return [3 /*break*/, 2];
                        return [4 /*yield*/, this.getBrowserTitle()];
                    case 1:
                        filename = (_a.sent()) + ' -- ' + new Date().toLocaleDateString();
                        _a.label = 2;
                    case 2:
                        forbiddenChars = ['<', '>', ':', '"', '/', '\\', '|', '?', '*'];
                        for (_i = 0, forbiddenChars_1 = forbiddenChars; _i < forbiddenChars_1.length; _i++) {
                            char = forbiddenChars_1[_i];
                            if (filename.indexOf(char) > -1) {
                                filename = filename.replace(char, '');
                            }
                        }
                        // append default extension if none is set yet
                        if (!filename.endsWith(fileExtension[0]) && !filename.endsWith(fileExtension[1]) && !filename.endsWith(fileExtension[2]) && !filename.endsWith(fileExtension[3])) {
                            filename += fileExtension[0];
                        }
                        return [2 /*return*/, protractor_1.browser.takeScreenshot().then(function (screenshot) {
                                // create directory if it does not exist and store screenshot there
                                try {
                                    if (!fs.existsSync(directory)) {
                                        fs.mkdirSync(directory);
                                    }
                                    var stream = fs.createWriteStream(directory + '/' + filename);
                                    stream.write(new Buffer(screenshot, 'base64'));
                                    stream.end();
                                }
                                catch (e) {
                                    console.error(e);
                                }
                            })];
                }
            });
        });
    };
    /**
     * Check if a page is served using the secure HTTPS
     * @param {string} url if no URL is provided, then the current URL will be used
     */
    BetterProtractorService.prototype.isHttps = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!url) return [3 /*break*/, 1];
                        _a = url;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getUrl()];
                    case 2:
                        _a = (_b.sent());
                        _b.label = 3;
                    case 3: return [2 /*return*/, (_a).indexOf('https://') !== -1];
                }
            });
        });
    };
    /**
     * Execute a script in the browser
     * @param {string | Function} script
     * @return {Promise<*>}
     */
    BetterProtractorService.prototype.executeScript = function (script) {
        return protractor_1.browser.executeScript(script);
    };
    /**
     * Restart the browser. Beware that you need to call disableAngular() again if your web page is running not Angular.
     */
    BetterProtractorService.prototype.restartBrowser = function () {
        return protractor_1.browser.restart();
    };
    /**
     * Refresh current tab
     * @param {number} timeout
     */
    BetterProtractorService.prototype.refresh = function (timeout) {
        return protractor_1.browser.refresh(timeout);
    };
    /**
     * Disable Angular (for non-Angular pages or if you encounter problems with Angular lifecycle)
     */
    BetterProtractorService.prototype.disableAngular = function () {
        return protractor_1.browser.waitForAngularEnabled(false);
    };
    /**
     * Display a mouse pointer
     * @param options
     */
    BetterProtractorService.prototype.showMousePointer = function (options) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeScript(function () {
                            var EventSniffer = function () {
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
                                var proto = EventTarget.prototype;
                                var oldAEL = proto.addEventListener;
                                var self = this;
                                proto.addEventListener = function (name) {
                                    // Add our own event listener first
                                    oldAEL.call(this, name, function (e) {
                                        self.handle(name, e);
                                    });
                                    // The add the users listener as normal
                                    return oldAEL.apply(this, arguments);
                                };
                            };
                            var MouseTracker = function () {
                                var MOUSE_ID = 'protractor-mouse-tracker';
                                this.indicator = document.createElement('div');
                                this.indicator.setAttribute('id', MOUSE_ID);
                                this.style = document.createElement('style');
                                this.style.innerHTML =
                                    "#" + MOUSE_ID + " {\n\t\t\t\t\t\twidth: 0.5em;\n\t\t\t\t\t\theight: 0.5em;\n\t\t\t\t\t\tbackground: orange;\n\t\t\t\t\t\tbox-shadow: 0 0 0 1px white;\n\t\t\t\t\t\tborder-radius: 50%;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\ttop: 0;\n\t\t\t\t\t\tleft: 0;\n\t\t\t\t\t\tz-index: 100000;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t\ttransform: translate(-50%, -50%);\n\t\t\t\t\t\ttransition: background-color 0.2s linear;\n\t\t\t\t\t}\n\t\t\t\t\t#" + MOUSE_ID + ".mousedown {\n\t\t\t\t\t\tbackground: rgba(0, 128, 0, 0.5);\n\t\t\t\t\t}\n\t\t\t\t\t@keyframes mouse-tracker-click {\n\t\t\t\t\t\tto {\n\t\t\t\t\t\t\twidth: 5em;\n\t\t\t\t\t\t\theight: 5em;\n\t\t\t\t\t\t\topacity: 0;\n\t\t\t\t\t\t}\n\t\t\t\t\t}\n\t\t\t\t\t#" + MOUSE_ID + " .click {\n\t\t\t\t\t\twidth: 0.5em;\n\t\t\t\t\t\theight: 0.5em;\n\t\t\t\t\t\tborder: 1px solid rgba(128, 128, 128, 1);\n\t\t\t\t\t\tbox-shadow: 0 0 0 1px rgba(256, 256, 256, 1);\n\t\t\t\t\t\tborder-radius: 50%;\n\t\t\t\t\t\tposition: absolute;\n\t\t\t\t\t\ttop: 50%;\n\t\t\t\t\t\tleft: 50%;\n\t\t\t\t\t\tpointer-events: none;\n\t\t\t\t\t\ttransform: translate(-50%, -50%);\n\t\t\t\t\t\tanimation: 1s mouse-tracker-click;\n\t\t\t\t\t}";
                            };
                            MouseTracker.prototype.move = function (x, y) {
                                this.indicator.style.left = x + 'px';
                                this.indicator.style.top = y + 'px';
                            };
                            MouseTracker.prototype.click = function () {
                                var click = document.createElement('div');
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
                            var tracker = new MouseTracker();
                            var sniffer = new EventSniffer();
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
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Hide mouse pointer displayed with @link {showMouse()}
     */
    BetterProtractorService.prototype.hideMouse = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.executeScript(function () {
                            document.getElementById('protractor-mouse-tracker').remove();
                        })];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * Drag an element to a specified location or element.
     * If you provide a WebElement, then the location will be used to calculate the offset.
     */
    BetterProtractorService.prototype.dragElement = function (element, target, waitTime) {
        if (waitTime === void 0) { waitTime = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var targetCoordinates, _a;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        if (!this.isILocation(target)) return [3 /*break*/, 1];
                        _a = target;
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, this.getOffset(element, target)];
                    case 2:
                        _a = _b.sent();
                        _b.label = 3;
                    case 3:
                        targetCoordinates = _a;
                        return [4 /*yield*/, this.hoverElement(element)];
                    case 4:
                        _b.sent();
                        // focus element
                        return [4 /*yield*/, protractor_1.browser.driver.actions()
                                .mouseDown()
                                .perform()];
                    case 5:
                        // focus element
                        _b.sent();
                        return [4 /*yield*/, this.pauseBrowserTemporarily(waitTime)];
                    case 6:
                        _b.sent();
                        // drag element
                        return [4 /*yield*/, protractor_1.browser.driver.actions()
                                .mouseMove(targetCoordinates)
                                .perform()];
                    case 7:
                        // drag element
                        _b.sent();
                        // let go of mouse
                        return [4 /*yield*/, protractor_1.browser.driver.actions()
                                .mouseUp()
                                .perform()];
                    case 8:
                        // let go of mouse
                        _b.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @param element {ElementFinder} should contain the text to be selected
     */
    BetterProtractorService.prototype.selectText = function (element) {
        return __awaiter(this, void 0, void 0, function () {
            var webElem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, element.getWebElement()];
                    case 1:
                        webElem = _a.sent();
                        return [4 /*yield*/, protractor_1.browser.executeScript(function (args) {
                                if (!args) {
                                    return null;
                                }
                                var range = document.createRange();
                                range.selectNode(args.firstChild);
                                var selection = window.getSelection();
                                selection.removeAllRanges();
                                selection.addRange(range);
                            }, webElem)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    /**
     * @returns {Promise<string>} the selected text
     */
    BetterProtractorService.prototype.getSelectedText = function () {
        return this.executeScript(function () {
            var selection = window.getSelection();
            var node = selection.focusNode;
            if (!node) {
                return null;
            }
            return node.nodeValue ?
                node.nodeValue.substring(selection.baseOffset, selection.focusOffset) : node['innerText'];
        });
    };
    /**
     * Get the underlying ProtractorBrowser if you need to access the Protractor API directly.
     * @return {ProtractorBrowser}
     */
    BetterProtractorService.prototype.getProtractorBrowser = function () {
        return protractor_1.browser;
    };
    /**
     * Get the underlying ElementArrayFinder if you need to access the Protractor API directly.
     */
    BetterProtractorService.prototype.getProtractorElementArrayFinder = function (by) {
        return protractor_1.element.all(by);
    };
    BetterProtractorService.prototype.isILocation = function (element) {
        return element.x !== undefined && element.y !== undefined;
    };
    BetterProtractorService.prototype.getOffset = function (source, target) {
        return __awaiter(this, void 0, void 0, function () {
            var sourceCoordinates, targetCoordinates, sourceDimensions, targetDimensions;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, source.getLocation()];
                    case 1:
                        sourceCoordinates = _a.sent();
                        return [4 /*yield*/, target.getLocation()];
                    case 2:
                        targetCoordinates = _a.sent();
                        return [4 /*yield*/, source.getSize()];
                    case 3:
                        sourceDimensions = _a.sent();
                        return [4 /*yield*/, target.getSize()];
                    case 4:
                        targetDimensions = _a.sent();
                        return [2 /*return*/, {
                                x: Math.round(targetCoordinates.x - sourceCoordinates.x + 0.5 * (targetDimensions.width - sourceDimensions.width)),
                                y: Math.round(targetCoordinates.y - sourceCoordinates.y + 0.5 * (targetDimensions.height - sourceDimensions.height))
                            }];
                }
            });
        });
    };
    return BetterProtractorService;
}());
exports.BetterProtractorService = BetterProtractorService;
//# sourceMappingURL=index.js.map