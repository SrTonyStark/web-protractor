import { by, element } from 'protractor';
import { Page } from '../page';

class ElementsPage extends Page {
  constructor() {
    super();
  }

  async get(): Promise<void> {
    await super.get('/elements');
  }

  async openTextBox(): Promise<void> {
    await element(by.xpath('//li/span[.="Text Box"]')).click();
  }
}
export default new ElementsPage();
