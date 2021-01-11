import { When } from 'cucumber';
import { browser } from 'protractor';

When('sync step', () => {
  // TODO: Given Sync Step
});

When('async step', async () => {
  await browser.sleep(100);
  // TODO: Given ASync Step
});
