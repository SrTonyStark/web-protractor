import { env } from '../support/environment';
import { capabilitiesChrome } from './browser.chrome.conf';
import { capabilitiesFirefox } from './browser.firefox.conf';
import { capabilitiesEdge } from './browser.edge.conf';
import { capabilitiesSafari } from './browser.safari.conf';

const browserEnabled = ['chrome', 'firefox', 'edge', 'safari'];

export function loadCapabilities(): string[] {
  const capabilities = [];
  runInBrowser().forEach((browser) => {
    switch (browser) {
      case 'chrome':
        capabilities.push(capabilitiesChrome);
        break;
      case 'firefox':
        capabilities.push(capabilitiesFirefox);
        break;
      case 'edge':
        capabilities.push(capabilitiesEdge);
        break;
      case 'safari':
        capabilities.push(capabilitiesSafari);
        break;
    }
  });
  return capabilities;
}

export function runInBrowser(): string[] {
  const browserList = [];
  env.browser
    .replace(/\s+/, '')
    .split(',')
    .forEach((browser) => {
      if (browserEnabled.includes(browser)) {
        browserList.push(browser);
      }
    });
  if (browserList.length == 0) {
    throw new Error(`Invalid browser(s): ${env.browser}`);
  }
  return browserList || ['chrome'];
}
