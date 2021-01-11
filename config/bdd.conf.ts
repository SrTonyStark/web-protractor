import * as dotenv from 'dotenv';
dotenv.config();

import { Config } from 'protractor';
import * as browserConfig from './browser.conf';
import { cucumberConfig, cucumberHooks } from './cucumber.conf';
import { webdriverConfig } from './webdriver.conf';
import { getBaseUrl } from '../support/utils';

export const config: Config = {
  ...webdriverConfig,
  baseUrl: getBaseUrl(),
  multiCapabilities: browserConfig.loadCapabilities(),
  ...cucumberConfig,
  ...cucumberHooks,
};

console.log('Config:', JSON.stringify(config));
