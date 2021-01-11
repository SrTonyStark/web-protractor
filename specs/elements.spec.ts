import { expect } from 'chai';
import { textboxPage } from '../pages';

const isNotTrue = false;

describe('elements', () => {
  describe('text box', () => {
    it('fill form', async () => {
      const data = {
        name: 'Jose Alvez',
        email: 'jose.alve@mail.com',
        currentAddress: 'Calle Vivo 1',
        permanentAddress: 'Calle Nueva 2',
      };
      await textboxPage.get();
      const result = await textboxPage.fillForm(data);
      expect(result).to.eql(data);
    });
  });
  // describe('Sub Test Set', () => {
  //   it('Sub Test Example', () => {
  //     expect(isNotTrue).to.be.false;
  //   });
  // });
});
