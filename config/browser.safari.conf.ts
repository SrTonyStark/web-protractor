import { env } from '../support/environment';
import { metadata } from './metadata.conf';

const optionsHeadless: string[] = [];

const optionsDefault: string[] = [];

export const capabilitiesSafari = {
  'maxInstances': 1,
  'browserName': 'safari',
  'args': [...optionsDefault, ...(env.headless === 'true' ? optionsHeadless : [])],
  'metadata': metadata,
};
