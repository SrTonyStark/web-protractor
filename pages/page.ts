import {
  browser,
  by,
  element,
  ElementArrayFinder,
  ElementFinder,
  ExpectedConditions,
} from 'protractor';

// Default timeout to wait an element
const waitElementTimeTimeout = 10 * 1000;

export class Page {
  async get(path: string): Promise<void> {
    await browser.get(path);
  }

  async waitForElementButton(button: ElementFinder): Promise<void> {
    this.waitForElement(button);
    await browser.wait(
      ExpectedConditions.elementToBeClickable(button),
      waitElementTimeTimeout
    );
  }

  async waitForElement(webElement: ElementFinder): Promise<ElementFinder> {
    try {
      return await browser.wait(
        ExpectedConditions.presenceOf(webElement),
        waitElementTimeTimeout
      );
    } catch (e) {
      throw new Error(`Waiting element timed out: ${webElement.locator().toString()}`);
    }
  }

  async waitForElementPresence(webElement: ElementFinder): Promise<void> {
    await browser.wait(ExpectedConditions.presenceOf(webElement), waitElementTimeTimeout);
  }

  async waitForUrl(context: string): Promise<void> {
    await browser.wait(ExpectedConditions.urlContains(context), waitElementTimeTimeout);
  }

  async waitForDisplayed(webElement: ElementFinder): Promise<boolean> {
    return await browser.wait(
      ExpectedConditions.visibilityOf(webElement),
      waitElementTimeTimeout,
      'Wait for displayed ' + webElement.locator()
    );
  }

  async waitForInvisible(webElement: ElementFinder): Promise<boolean> {
    await browser.wait(
      ExpectedConditions.invisibilityOf(webElement),
      waitElementTimeTimeout,
      'Wait for invisible' + webElement.locator()
    );
    return true;
  }

  async waitForClickable(webElement: ElementFinder): Promise<void> {
    await browser.wait(
      ExpectedConditions.elementToBeClickable(webElement),
      waitElementTimeTimeout,
      'Wait for clickable ' + webElement.locator()
    );
  }

  async waitForSelectable(webElement: ElementFinder): Promise<void> {
    await browser.wait(
      ExpectedConditions.elementToBeSelected(webElement),
      waitElementTimeTimeout,
      'Wait for selectable:' + webElement.locator()
    );
  }

  async waitForTextBePresent(webElement: ElementFinder, text: string): Promise<void> {
    await browser.wait(
      ExpectedConditions.textToBePresentInElement(webElement, text),
      waitElementTimeTimeout,
      'Wait for text be present:' + webElement.locator()
    );
  }

  async waitForPresent(webElement: ElementFinder): Promise<void> {
    await browser.wait(() => {
      return webElement.isPresent();
    });
  }

  async waitForpresenceAll(elements: ElementArrayFinder, timeout: number): Promise<void> {
    for (let index = 0; index < timeout; index++) {
      const total = await elements.count();
      if (total > 0) {
        return;
      }
      browser.sleep(1000);
    }
    throw new Error(`"${timeout}" second maximum timeout, items have not loaded`);
  }

  async selectByValue(webElement: ElementFinder, value: string): Promise<void> {
    return await webElement.all(by.css('option[value="' + value + '"]')).click();
  }

  async selectByPartialText(webElement: ElementFinder, text: string): Promise<void> {
    return await webElement.all(by.cssContainingText('option', text)).click();
  }

  async selectByText(webElement: ElementFinder, text: string): Promise<void> {
    return await webElement.all(by.xpath('option[.="' + text + '"]')).click();
  }

  getRandomDNI(): string {
    const number = Math.round(Math.random() * 100000000);
    const cad = 'TRWAGMYFPDXBNJZSQVHLCKE';
    const pos = number % 23;
    const letter = cad.substr(pos, 1);
    const document = number + letter;
    return document;
  }

  async waitForAngularLoadAllComponents(): Promise<void> {
    const compSpinner = element.all(by.xpath("//div[@class='loader-spinner']"));
    await browser.wait(async () => {
      return (await compSpinner.count()) === 1;
    }, waitElementTimeTimeout);
  }
}
