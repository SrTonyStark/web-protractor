import { env } from '../support/environment';
import * as utils from '../support/utils';
import { metadata } from './metadata.conf';

const resolution = utils.getResolution();

const optionsHeadless: string[] = ['--headless'];

const optionsDefault: string[] = [
  `--window-size=${resolution.width},${resolution.height}`,
];

export const capabilitiesFirefox = {
  'maxInstances': 1,
  'browserName': 'firefox',
  'moz:firefoxOptions': {
    'args': [...optionsDefault, ...(env.headless ? optionsHeadless : [])],
  },
  'acceptInsecureCerts': true,
  'metadata': metadata,
};
