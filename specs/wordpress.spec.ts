import { loginPage, wordpressPage } from '../pages';
import { expect } from 'chai';

/**
 * Unit Testing - The AAA Pattern:
 * - Arrange
 * - Act
 * - Assert
 */
describe('wordpress', () => {
  it('usuario accede al home e inicia sesion', async () => {
    await wordpressPage.get();
    await wordpressPage.homepageIsPresent();

    await loginPage.accessAccount();

    const result = await wordpressPage.loginSuccess();
    expect(result).to.be.true;
  });

  it('usuario realiza un comentario', async () => {
    // await wordpressPage.loginSuccess();
    // await wordpressPage.homeMenuAccess();
    // await wordpressPage.postAccess();
    // const inputText = await wordpressPage.sendComment();
    // const result = await wordpressPage.getLastComment();
    // expect(result).to.equal(inputText);
  });
});
