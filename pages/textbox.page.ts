import { $, by, element, ElementFinder } from 'protractor';
import { Page } from './page';

class TextBoxPage extends Page {
  constructor() {
    super();
  }

  get fieldFullName(): ElementFinder {
    return $('#userName');
  }

  get fieldEmail(): ElementFinder {
    return $('#userEmail');
  }

  get fieldCurrentAddress(): ElementFinder {
    return $('#currentAddress');
  }

  get fieldPermanentAddress(): ElementFinder {
    return $('#permanentAddress');
  }

  get buttonSubmit(): ElementFinder {
    return $('#submit');
  }

  get textOutputName(): ElementFinder {
    return $('#output #name');
  }

  get textOutputEmail(): ElementFinder {
    return $('#output #name');
  }

  get textOutputCurrentAdrress(): ElementFinder {
    return $('#output #name');
  }

  get textOutputPermanentAddress(): ElementFinder {
    return $('#output #name');
  }

  async get(): Promise<void> {
    await super.get('/elements');
  }

  async openTextBox(): Promise<void> {
    await element(by.xpath('//li/span[.="Text Box"]')).click();
  }

  async fillForm(data: {
    name: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }): Promise<{
    name: string;
    email: string;
    currentAddress: string;
    permanentAddress: string;
  }> {
    await this.fieldFullName.sendKeys(data.name);
    await this.fieldEmail.sendKeys(data.email);
    await this.fieldCurrentAddress.sendKeys(data.currentAddress);
    await this.fieldPermanentAddress.sendKeys(data.permanentAddress);
    await this.buttonSubmit.click();
    return {
      name: await this.textOutputName.getText(),
      email: await this.textOutputEmail.getText(),
      currentAddress: await this.textOutputCurrentAdrress.getText(),
      permanentAddress: await this.textOutputPermanentAddress.getText(),
    };
  }
}
export default new TextBoxPage();
