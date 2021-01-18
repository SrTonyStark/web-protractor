import { by, element, ElementFinder } from 'protractor';
import { Page } from './page';
import { userData } from '../data';

class LoginPage extends Page {
  usernameInput: ElementFinder;
  passwordInput: ElementFinder;
  submitButton: ElementFinder;
  alertMessage: ElementFinder;

  constructor() {
    super();
    this.usernameInput = element(by.id('user_login'));
    this.passwordInput = element(by.id('user_pass'));
    this.submitButton = element(by.id('wp-submit'));
    this.alertMessage = element(by.css('#flash-messages > div'));
  }

  async open() {
    await super.get('/login');
  }

  async accessAccount(): Promise<void> {
    await super.waitForClickable(this.usernameInput);
    await this.usernameInput.sendKeys(userData.default.email);
    await super.waitForClickable(this.passwordInput);
    await this.passwordInput.sendKeys(userData.default.pwd);
    await this.submitButton.click();
    //return this.getAlertMessage();
  }

  async getAlertMessage(): Promise<string> {
    await super.waitForDisplayed(this.alertMessage);
    return await this.alertMessage.getText();
  }
}

export default new LoginPage();