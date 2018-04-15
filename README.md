# *better-protractor* - no more excuses for not writing tests

Test everything you can test with *better-protractor* which relies on **Protractor**, the end-to-end-testing framework made by the Angular team.
However, Protractor can be used on any kind of web page, Angular is not required!

*better-protractor* will help you to write better end-to-end tests by providing a simple API on top of Protractor. Optimized for usage with **Typescript**, but tests written in Javascript should work as well.

[Read this article if you want to learn more about end-to-end testing in general.](https://medium.freecodecamp.org/why-end-to-end-testing-is-important-for-your-team-cb7eb0ec1504)

## Installation:
1. If you do not have Protractor and Webdriver setup yet, then please do so: [Protractor setup](http://www.protractortest.org/#/tutorial#setup)
2. Install better-protractor: ```**npm install better-protractor** or **npm install better-protractor --dev**```

## Usage:
- **Recommended (Typescript)**: Create a custom class which extends BetterProtractorService. You can override the default methods and add your own custom variables and methods.
```javascript
const service: CustomTestService = new CustomTestService();
```
- You can also directly use *better-protractor* in Typescript if the provided methods suit your needs or if you do not want to let your custom page object class inherit.
```javascript
const service: EndToEndTestingService = new EndToEndTestingService();
```
- You can also use *better-protractor* in Javascript.
```javascript
const e2e = require("better-protractor");
const service = new e2e.BetterProtractorService();
```
- For writing the actual tests, [Jasmine](https://jasmine.github.io/) is recommended. However, *better-protractor* does not rely on a particular testing framework so you are free to use any Javascript testing framework (e.g. Mocha, Jest, QUnit).

## Compatibility:
Tested with Angular >= 2, Typescript > 2 and latest Protractor (5.3).

## Examples
See the e2e folder for code examples in Javascript and Typescript.

## Local development
1. Download the repository.
2. Get Node.js and install it if you haven't already.
3. Use **npm install** to install the necessary dependencies.
4. Run **webdriver-manager update** (once or when you updated your browser).
5. Run **webdriver-manager start** to launch Webdriver(Selenium)
6. Run **protractor** to execute the samples in the e2e-folder.

Pull requests and feature requests are welcome!
