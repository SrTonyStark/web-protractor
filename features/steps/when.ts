import { When } from 'cucumber';
import { loginPage } from '../../pages';


When('Se introduce usuario y contraseña', async () => {
  await loginPage.accessAccount();
});
