import { When } from 'cucumber';
import { loginPage, wordpressPage } from '../../pages';


When('Se introducen los credenciales', async () => {
  await loginPage.accessAccount();
});

When('Se accede al home', async () => {
  await wordpressPage.homeMenuAccess();
});

When('Se accede al post', async () => {
  await wordpressPage.postAccess();
});

When('Se envía un comentario', async () => {
  await wordpressPage.sendComment();
});

When('Se introduce un dato en la barra de búsqueda', async () => {
  //TODO
});

