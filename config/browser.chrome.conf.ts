import { env } from '../support/environment';
import { metadata } from './metadata.conf';

const optionsHeadless: string[] = ['--headless', '--disable-gpu'];

const optionsDefault: string[] = [
  'no-sandbox',
  '--disable-browser-side-navigation',
  '--allow-insecure-localhost',
  '--test-type',
];

export const capabilitiesChrome = {
  'maxInstances': 1,
  'shardTestFiles': true,
  'browserName': 'chrome',
  'chromeOptions': {
    'args': [...optionsDefault, ...(env.headless ? optionsHeadless : [])],
  },
  'loggingPrefs': {
    'driver': 'ALL',
    'browser': 'ALL',
    'performance': 'ALL',
  },
  'acceptInsecureCerts': true,
  'metadata': metadata,
};
