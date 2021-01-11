import fs from 'fs';
import { browser } from 'protractor';
import { getBaseUrl } from '../support/utils';

fs.mkdirSync('./reports', { recursive: true });
fs.mkdirSync('./logs', { recursive: true });

export const cucumberConfig = {
  framework: 'custom',
  frameworkPath: require.resolve('protractor-cucumber-framework'),

  specs: ['../../features/*.feature'],

  cucumberOpts: {
    format: [
      'node_modules/cucumber-pretty', // cucumber-pretty are set to write to stdout
      'dist/support/report.js:logs/output.txt', // provide a temp output file to generate the report
      'json:reports/report.json',
    ],
    require: [
      '../features/steps/*.js',
      '../support/environment.js',
      '../support/protractorLogs.js',
      '../support/testData.js',
      '../support/utils.js',
    ],
    tags: getTags(),
    'dry-run': false,
  },

  plugins: [
    {
      package: 'protractor-multiple-cucumber-html-reporter-plugin',
      options: {
        reportName: 'Report Name Example',
        automaticallyGenerateReport: true,
        removeExistingJsonReportFile: true,
        displayDuration: true,
        customData: {
          title: 'Automation Report',
          data: [
            { label: 'Environment', value: process.env.APP_ENV },
            { label: 'Base URL', value: getBaseUrl() },
          ],
        },
      },
    },
  ],
};

export const cucumberHooks = {
  onPrepare: async (): Promise<void> => {
    browser.resetUrl = 'about:blank'; // Fix Safari refuses to parse data URLs
    // await browser.driver.manage().window().maximize();
    await browser.waitForAngularEnabled(false);
  },

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  onComplete: (): void => {},
};

function getTags(): string[] {
  const tags = ['~@skip'];
  if (process.env.TAG) {
    const inputTags = process.env.TAG;
    inputTags
      .replace(/\s+/, '')
      .split(',')
      .forEach((tag) => {
        tags.push(tag);
      });
  }
  return tags;
}
