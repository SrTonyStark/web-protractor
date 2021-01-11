import * as dotenv from 'dotenv';
dotenv.config();

import { Config } from 'protractor';
import * as browserConfig from './browser.conf';
import { jasmineConfig, jasmineHooks } from './jasmine.conf';
import { webdriverConfig } from './webdriver.conf';
import { getBaseUrl } from '../support/utils';
import { listEnvVariables } from '../support/environment';

export const config: Config = {
  ...webdriverConfig,
  baseUrl: getBaseUrl(),
  multiCapabilities: browserConfig.loadCapabilities(),
  ...jasmineConfig,
  ...jasmineHooks,
};

console.log('Environment Vars:', JSON.stringify(listEnvVariables()));
console.log('Config:', JSON.stringify(config));
