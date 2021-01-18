import { Given } from 'cucumber';
import { wordpressPage, loginPage } from '../../pages';

Given('Un usuario en el login', async () => {
  // await idealistaPage.get();
  // await idealistaPage.HomepageIsPresent();
  await wordpressPage.get();
  await wordpressPage.HomepageIsPresent();
});

Given('Se accede al area de usuarios', async () => {
  await wordpressPage.accessLogin();
});

Given('Un usuario logueado', async () => {
  //await wordpressPage.get();
  await wordpressPage.loginSuccess();
});

Given('Un usuario en el home', async () => {
  await wordpressPage.homeVerify();
});




