import { ElementFinder, element, by } from 'protractor';
import { Page } from './page';
import { userData } from '../data';

class wordpressPage extends Page {
  homepageID: ElementFinder;
  userAccess: ElementFinder;
  userMenu: ElementFinder;
  userAds: ElementFinder;
  menuHome: ElementFinder;
  postTitle: ElementFinder;
  commentBox: ElementFinder;
  postCommentButton: ElementFinder;
  homeHeader: ElementFinder;

  constructor() {
    super();
    this.homepageID = element(by.id('login'));
    this.userMenu = element(by.id('welcome-panel'));
    this.menuHome = element(by.id('wp-admin-bar-site-name'));
    this.postTitle = element(by.className('entry-header'));
    this.commentBox = element(by.id('comment'));
    this.postCommentButton = element(by.id('submit'));
    this.homeHeader = element(by.className('custom-header'));
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

  async accessLogin() {
    await super.waitForClickable(this.userAccess);
    this.userAccess.click();
  }

  async loginSuccess() {
    await super.waitForDisplayed(this.userMenu);
  }

  async homeMenuAccess() {
    await super.waitForClickable(this.menuHome);
    await this.menuHome.click();
  }

  async postAccess() {
    await super.waitForClickable(this.postTitle);
    await this.postTitle.click();
  }

  async sendComment() {
    await super.waitForPresent(this.commentBox);
    await this.commentBox.click();
    await this.commentBox.sendKeys(userData.default.comment);
    await this.postCommentButton.click();
  }

  async homeVerify() {
    await super.waitForPresent(this.homeHeader);
  }
}

export default new wordpressPage();
