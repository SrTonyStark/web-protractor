/**
 * - The world instance isn’t available in my hooks or step definitions -
 * This has frequently been caused by the use of ES6 arrow functions. If you are
 * using the world instance (which is bound to this) in a step definition, then
 * you cannot use ES6 arrow functions for step definitions or hooks because they
 * bind this to the current context which prevents the world instance from being
 * injected.
 * https://github.com/cucumber/cucumber-js/blob/master/docs/faq.md
 */
import { After, AfterAll, Before, BeforeAll, setDefaultTimeout } from 'cucumber';
import { browser } from 'protractor';
import { generateLogs, getLogName } from '../../support/protractorLogs';
import { takeScreenshot } from '../../support/screenshot';

setDefaultTimeout(30 * 1000);

BeforeAll(function () {});

AfterAll(function () {});

Before(function (scenario) {});

// eslint-disable-next-line @typescript-eslint/no-unused-vars

// ** Descomentar para reiniciar la sesión del navegador **
// After(async function (scenario) {
//   const logName = getLogName(scenario);
//   await generateLogs(logName);

//   const imageBase64 = await takeScreenshot();
//   this.attach(imageBase64, 'image/png');

//   await browser.driver.manage().deleteAllCookies();
//   await browser.executeScript('window.sessionStorage.clear();');
//   await browser.executeScript('window.localStorage.clear();');
// });
