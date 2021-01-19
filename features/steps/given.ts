import { Given } from 'cucumber';
import { wordpressPage } from '../../pages';

Given('Un usuario en el login', async () => {
  await wordpressPage.get();
  await wordpressPage.homepageIsPresent();
});

Given('Un usuario logueado', async () => {
  await wordpressPage.loginSuccess();
});

Given('Un usuario en el home', async () => {
  await wordpressPage.homeVerify();
});
