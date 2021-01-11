import JasmineAllureReporter from 'jasmine-allure-reporter';
import { SpecReporter } from 'jasmine-spec-reporter';
import { browser } from 'protractor';

export const jasmineConfig = {
  framework: 'jasmine2',
  jasmineNodeOpts: {
    showColors: true,
    silent: false,
    defaultTimeoutInterval: 10 * 1000,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    print: function (): void {}, // Remove the dots in execution log
  },
  allScriptsTimout: 20 * 1000,
  specs: ['../specs/*.spec.js'],

  suites: {},
};

const allureReporter = new JasmineAllureReporter({
  resultsDir: 'reports/allure',
});

const jasmineSpecReporter = new SpecReporter({
  spec: {
    displayFailed: true,
    displayDuration: true,
  },
});

export const jasmineHooks = {
  onPrepare: async (): Promise<void> => {
    jasmine.getEnv().addReporter(allureReporter);
    jasmine.getEnv().addReporter(jasmineSpecReporter);

    browser.resetUrl = 'about:blank'; // Fix Safari refuses to parse data URLs
    await browser.waitForAngularEnabled(false);
  },
};
