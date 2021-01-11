import { Given } from 'cucumber';
import { browser } from 'protractor';

Given('sync step', () => {
  // TODO: Given Sync Step
});

Given('async step', async () => {
  await browser.sleep(100);
  // TODO: Given ASync Step
});
