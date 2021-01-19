import { expect } from 'chai';
import { Then } from 'cucumber';
import { wordpressPage } from '../../pages';

Then('Se accede a la cuenta', async() => {
  const result = await wordpressPage.loginSuccess();
  expect(result).to.be.true;
});

Then('Se visualiza el comentario', async() => {
  //TODO
});

Then('Se devuelve el resultado de la búsqueda', async() => {
  //TODO
});

