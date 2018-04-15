# *better-protractor* - no more excuses for not writing tests

Test everything you can test with *better-protractor* which relies on **Protractor**, the end-to-end-testing framework made by the Angular team.
However, Protractor can be used on any kind of web page, Angular is not required!

*better-protractor* will help you to write better end-to-end tests. Optimized for usage with **Typescript**, but tests written in Javascript should work as well.

[Read this article if you want to learn more about end-to-end testing.](https://medium.freecodecamp.org/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504)

## Installation:
1. If you do not have Protractor and Webdriver setup yet, then please do so: [Protractor setup](http://www.protractortest.org/#/tutorial#setup)
2. **npm install better-protractor** or **npm install better-protractor --dev**

## Usage:
- **Recommended (Typescript)**: Create a custom class which extends BetterProtractorService. You can override the default methods and add your own custom variables and methods.
```javascript
const service: CustomTestService = new CustomTestService();
```
- You can also directly use *better-protractor*.
```javascript
const UtilityService = require("../index.ts");
const service: BetterProtractorService = new UtilityService.BetterProtractorService(false);
```
- You can also use *better-protractor* in Javascript.
```javascript
const e2e = require("../index.ts");
const service = new e2e.BetterProtractorService();
```
- For writing the actual tests, I recommend to use [Jasmine](https://jasmine.github.io/). However, *better-protractor* does not rely on a particular testing framework so you are free to use any Javascript testing framework (e.g. Mocha, Jest, QUnit).

## Compatibility:
Tested with Angular >= 2, Typescript > 2 and latest Protractor (5.3).

## Examples
See the e2e folder for code examples in Javascript and Typescript.

## Local development
1. Download the repository.
2. Get Node.js if you haven't already.
3. Use **npm install** to install the necessary dependencies.
4. Run **webdriver-manager update** (once)
5. Run **webdriver-manager start** to launch Webdriver(Selenium)
6. Run **protractor** to execute the samples in the e2e-folder.

Pull requests and feature requests are welcome!
