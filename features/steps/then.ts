import { Then } from 'cucumber';
import { wordpressPage } from '../../pages';

Then('Se accede a la cuenta', async() => {
  await wordpressPage.loginSuccess();
});

Then('Se visualiza el comentario', async() => {
  //TODO
});

Then('Se devuelve el resultado de la búsqueda', async() => {
  //TODO
});

