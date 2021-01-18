import { When } from 'cucumber';
import { loginPage } from '../../pages';


When('Se introducen los credenciales', async () => {
  await loginPage.accessAccount();
});
