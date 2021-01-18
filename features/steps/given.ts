import { Given } from 'cucumber';
import { wordpressPage, loginPage } from '../../pages';

Given('Estar en el login', async () => {
  // await idealistaPage.get();
  // await idealistaPage.HomepageIsPresent();
  await wordpressPage.get();
  await wordpressPage.HomepageIsPresent();
});

Given('Se accede al area de usuarios', async () => {
  await wordpressPage.accessLogin();
});


