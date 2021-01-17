import { $, Browser, browser, ElementFinder } from 'protractor';
import { Page } from './page';

class idealistaPage extends Page {
  constructor() {
    super();
  }

  get homepageID(): ElementFinder {
    return $('title');
  }

  get userAccess(): ElementFinder {
    return $('a[href="/login"]');
  }

  get userMenu(): ElementFinder {
    return $('div.user-info');
  }

  get userAds(): ElementFinder {
    return $('div[class="advTitle"]');
  }

  async get() {
    await super.get('/login');
  }

  async HomepageIsPresent() {
    await super.waitForDisplayed(this.homepageID);
    const text = await this.homepageID.getText();
    if (text.includes("Idealista")) {
      return true;
    } else {
      return false;
    }
  }

  async accessLogin(){
      await super.waitForClickable(this.userAccess);
      this.userAccess.click();
  }

  async loginSuccess(){
    await super.waitForClickable(this.userMenu);
    await super.waitForDisplayed(this.userAds);
}
}

export default new idealistaPage();
