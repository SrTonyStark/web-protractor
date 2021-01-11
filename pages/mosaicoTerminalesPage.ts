import { $, $$, browser, ElementArrayFinder, ElementFinder } from 'protractor';
import { Page } from './page';

export const OrderBy = Object.freeze({
  PrecioBajo: 'precio.mas.bajo',
  PrecioAlto: '-priceOC',
  AlfabeticoA_Z: 'name',
  AlfabeticoZ_A: '-name',
  Recomendados: 'recommendations',
});

export const BrandText = Object.freeze({
  Samsung: 'Samsung',
});

class MosaicoTerminalesPage extends Page {
  private contenedorDevicePrice: ElementFinder;
  private brandOption: ElementFinder;

  constructor() {
    super();
  }

  get componenteDevices(): ElementFinder {
    return $('ocs-devices-mosaic-card');
  }
  get botonMosaicoTerminales(): ElementFinder {
    return $(".orange-cms > ocs-button[routerlink='/devices']");
  }
  get contenedorDevice(): ElementArrayFinder {
    return this.componenteDevices.$$('div.device-card');
  }
  get buttonFiltrar(): ElementFinder {
    return $('div.alternate ocs-button button');
  }
  get componenteFilterSidenav(): ElementFinder {
    return $('#filterSidenav');
  }
  get filterBrand(): ElementFinder {
    return this.componenteFilterSidenav.$$('.accordion.white').get(4);
  }
  get filterOrderBy(): ElementFinder {
    return this.componenteFilterSidenav.$('#sort select');
  }
  get orderByOptions(): ElementArrayFinder {
    return this.filterOrderBy.$$('option');
  }
  get labelVerMas(): ElementArrayFinder {
    return $$("p[class='specs-text text-link']");
  }
  get buttonMostarElementos(): ElementFinder {
    return $('#filterSidenav div.sidenav-show button');
  }
  get botonPangea(): ElementFinder {
    return $("ocs-button[routerlink='/devices/pangea'] > button");
  }
  get selectDispositivo(): ElementFinder {
    return this.componenteDevices.$('div[class="checkbox-radio"] label');
  }
  get buttonLoQuiero(): ElementFinder {
    return $('ocs-button button.btn-primary');
  }
  get buttonNextPage(): ElementFinder {
    return $('button.ocs-pagination-next');
  }

  async get(): Promise<void> {
    await super.get('/products');
  }

  async clickVerMas() {
    super.waitForClickable(this.labelVerMas.get(0));
    await this.labelVerMas.get(0).click();
  }

  async seleccionarDispositivo() {
    await super.waitForClickable(this.selectDispositivo);
    await this.selectDispositivo.click();
    await super.waitForClickable(this.buttonLoQuiero);
    await this.buttonLoQuiero.click();
  }

  async paginaSiguiente() {
    super.waitForClickable(this.buttonNextPage);
    await this.buttonNextPage.click();
  }

  async acceder() {
    await super.waitForClickable(this.botonMosaicoTerminales);
    await this.botonMosaicoTerminales.click();
    await super.waitForClickable(this.botonPangea);
    await this.botonPangea.click();
  }

  async openFilter(): Promise<void> {
    await super.waitForClickable(this.contenedorDevice.get(0));
    await this.buttonFiltrar.click();
    await super.waitForDisplayed(this.componenteFilterSidenav);
  }

  async applyFilterBrand(brand: string): Promise<void> {
    await super.waitForClickable(this.filterBrand);
    await this.filterBrand.click();
    this.brandOption = $('label[title=' + brand + ']');
    await this.brandOption.click();
  }

  async applyFilterOrderBy(filterOption: string): Promise<void> {
    await super.waitForClickable(this.filterOrderBy);
    const numOptions = await this.orderByOptions.count();
    for (let index = 0; index < numOptions; index++) {
      const value = await this.orderByOptions.get(index).getAttribute('value');
      if (value === filterOption) {
        const arg = 'arguments[0].value="' + value + '"';
        console.log('ARGUMENTS', arg);
        await browser.executeScript(arg, this.filterOrderBy);
        return;
      }
    }
  }

  async applyFilter() {
    await super.waitForClickable(this.buttonMostarElementos);
    await browser.executeScript(
      'arguments[0].scrollIntoView();',
      this.buttonMostarElementos
    );
    await this.buttonMostarElementos.click();
  }

  async isFilterApplied(): Promise<boolean> {
    //waiting to device change
    await browser.sleep(5000);
    let checked = true;
    let currentPrice = 0;
    const total = await this.contenedorDevice.count();
    for (let index = 0; index < total; index++) {
      this.contenedorDevicePrice = this.contenedorDevice.get(index).$('div.price');
      let priceT = await this.contenedorDevicePrice.getText();
      priceT = priceT.substr(0, priceT.length - 1);
      const price = +priceT;
      console.log('Price', price);
      currentPrice > price ? (checked = false) : (currentPrice = price);
    }
    return checked;
  }
}

export default new MosaicoTerminalesPage();
