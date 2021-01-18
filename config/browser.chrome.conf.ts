import { env } from '../support/environment';
import * as utils from '../support/utils';
import { metadata } from './metadata.conf';

const resolution = utils.getResolution();

const optionsHeadless: string[] = ['--headless', '--disable-gpu'];

const optionsDefault: string[] = [
  // '--ignore-certificate-errors',
  // '--allow-insecure-localhost',
  `--window-size=${resolution.width},${resolution.height}`,
];

export const capabilitiesChrome = {
  'maxInstances': 1,
  'shardTestFiles': true,
  'browserName': 'chrome',
  'chromeOptions': {
    'args': ['no-sandbox', "--disable-browser-side-navigation", "--allow-insecure-localhost", "--test-type"],
  },
  'loggingPrefs': {
    'driver': 'ALL',
    'browser': 'ALL',
    'performance': 'ALL',
  },
  'acceptInsecureCerts': true,
  'metadata': metadata,
};
