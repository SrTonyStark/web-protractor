import { ElementFinder, element, by, ElementArrayFinder } from 'protractor';
import { Page } from './page';
import { userData } from '../data';

class wordpressPage extends Page {
  homepageID: ElementFinder;
  userMenu: ElementFinder;
  menuHome: ElementFinder;
  postTitle: ElementFinder;
  commentBox: ElementFinder;
  postCommentButton: ElementFinder;
  homeHeader: ElementFinder;
  lastComment: ElementArrayFinder;

  constructor() {
    super();
    this.homepageID = element(by.id('login'));
    this.userMenu = element(by.id('welcome-panel'));
    this.menuHome = element(by.id('wp-admin-bar-site-name'));
    this.postTitle = element(by.className('entry-header'));
    this.commentBox = element(by.id('comment'));
    this.postCommentButton = element(by.id('submit'));
    this.homeHeader = element(by.className('custom-header'));
    this.lastComment = element.all(by.css('.comment-content p'));
  }

  async get() {
    await super.get('');
  }

  async homepageIsPresent() {
    await super.waitForDisplayed(this.homepageID);
  }

  async loginSuccess() {
    return await super.waitForDisplayed(this.userMenu);
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
    const inputText = `${userData.default.comment} ${Math.floor(Math.random() * 10)}`;
    await super.waitForPresent(this.commentBox);
    await this.commentBox.click();
    await this.commentBox.sendKeys(inputText);
    await this.postCommentButton.click();
    return inputText;
  }

  async getLastComment() {
    // await super.waitForDisplayed(await this.lastComment[0]);
    // return await this.lastComment[this.lastComment.length - 1].getText()
  }

  async homeVerify() {
    await super.waitForPresent(this.homeHeader);
  }
}

export default new wordpressPage();
