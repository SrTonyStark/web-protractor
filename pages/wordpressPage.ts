import { $, $$, browser, ElementFinder, element,by } from 'protractor';
import { Page } from './page';

class wordpressPage extends Page {
  
  homepageID: ElementFinder;
  userAccess: ElementFinder;
  userMenu: ElementFinder;
  userAds: ElementFinder;

  constructor() {
    super();
    this.homepageID = element(by.id('login'));
    this.userMenu = element(by.id('welcomepanelonce'));
  }

  async get() {
    await super.get('');
  }

  async HomepageIsPresent() {
    await super.waitForDisplayed(this.homepageID);
    // const text = await this.homepageID.getText();
    // if (text.includes("opensourcecms")) {
    //   return true;
    // } else {
    //   return false;
    // }
  }

  async accessLogin(){
      await super.waitForClickable(this.userAccess);
      this.userAccess.click();
  }

  async loginSuccess(){
    await super.waitForClickable(this.userMenu);
}
}

export default new wordpressPage();
