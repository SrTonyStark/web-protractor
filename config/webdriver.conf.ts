import { env } from '../support/environment';

export const webdriverConfig = {
  'directConnect': env.directConnect, // communicates directly Chrome/Firefox Driver, if this is true, settings for seleniumAddress will be ignored
  'localSeleniumStandaloneOpts':
    !env.seleniumGrid && env.directConnect ? { 'port': 4444 } : undefined,
  'seleniumAddress': env.seleniumGrid,
  'SELENIUM_PROMISE_MANAGER': false, // enable async/await on asynchronous functions
};
