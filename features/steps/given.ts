import { Given } from 'cucumber';
import { idealistaPage } from '../../pages';

Given('Estar en la homepage', async () => {
  await idealistaPage.HomepageIsPresent();
});

Given('Se accede al area de usuarios', async () => {
  await idealistaPage.accessLogin();
});


