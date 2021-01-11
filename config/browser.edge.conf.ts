import { env } from '../support/environment';
import { metadata } from './metadata.conf';

const optionsHeadless: string[] = [];

const optionsDefault: string[] = [];

export const capabilitiesEdge = {
  'maxInstances': 1,
  'browserName': 'MicrosoftEdge', // Use the same name configured in grid
  'args': [...optionsDefault, ...(env.headless === 'true' ? optionsHeadless : [])],
  'acceptInsecureCerts': true,
  'metadata': metadata,
};
