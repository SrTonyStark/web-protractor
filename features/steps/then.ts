import { Then } from 'cucumber';
import { browser } from 'protractor';

Then('sync step', () => {
  // TODO: Given Sync Step
});

Then('async step', async () => {
  await browser.sleep(100);
  // TODO: Given ASync Step
});
