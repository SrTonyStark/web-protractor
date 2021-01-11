import fs from 'fs';
import path from 'path';
import { browser } from 'protractor';
import { PageChunk } from './pageChunk';
import { PageInfo } from './pageInfo';
import Jimp from 'jimp';

const tempFolder = path.join(process.cwd(), './temp/');
fs.mkdirSync(tempFolder, { recursive: true });

export async function takeScreenshot(): Promise<string> {
  const pageInfo = await capturePageInfo();
  await capturePageScreenshot(pageInfo.pageChunks);
  return await prepareUniqueImage(pageInfo);
}

async function capturePageInfo(): Promise<PageInfo> {
  // Capture info from page chunks
  const pageInfo = <PageInfo>(
    JSON.parse(
      await browser.executeScript(
        "return JSON.stringify({'pageHeight': document.body.offsetHeight, 'viewWidth': document.documentElement.offsetWidth, 'viewHeight': document.documentElement.offsetHeight, 'blocks': Math.ceil(document.body.offsetHeight / document.documentElement.offsetHeight)})"
      )
    )
  );
  // Define the page chunks
  pageInfo.pageChunks = [];
  for (let index = 0; index < pageInfo.blocks; index++) {
    const startCurrentView = pageInfo.viewHeight * index;
    const finishCurrentView = startCurrentView + pageInfo.viewHeight;
    pageInfo.pageChunks.push(<PageChunk>{
      start: startCurrentView + index,
      finish: finishCurrentView + index,
    });
  }
  // fixLastImage(pageInfo);
  return pageInfo;
}

/**
 * Fix the last image size
 *
 * @param {PageInfo} pageInfo
 */
// function fixLastImage(pageInfo: PageInfo): void {
//   if (pageInfo.pageChunks.slice(-1)[0].finish > pageInfo.pageHeight) {
//     pageInfo.pageChunks.slice(-1)[0].finish = pageInfo.pageHeight;
//   }
// }

async function capturePageScreenshot(pageChunks: PageChunk[]): Promise<void> {
  for (const page of pageChunks) {
    await browser.executeScript(`window.scrollTo(0, ${page.start})`);
    page.image = await capturePageScreenshotAndSave();
  }
}

async function capturePageScreenshotAndSave(): Promise<string> {
  const imageName = path.join(tempFolder, `/${Date.now()}.png`);
  const png = await browser.takeScreenshot();
  fs.writeFileSync(imageName, png, 'base64');
  return imageName;
}

async function prepareUniqueImage(pageInfo: PageInfo): Promise<string> {
  const fixImageWidth = (await Jimp.read(pageInfo.pageChunks[0].image)).getWidth();
  // const imageName = path.join(tempFolder, `/${Date.now()}`);
  const image = new Jimp(fixImageWidth, pageInfo.pageChunks.slice(-1)[0].finish, 'green');
  for (const page of pageInfo.pageChunks) {
    const pageChunk = await Jimp.read(page.image);
    image.composite(pageChunk, 0, page.start);
  }
  // await image.writeAsync(`${imageName}.${image.getExtension()}`);
  const imageName = await image.getBase64Async(Jimp.MIME_PNG);
  return imageName.substring(22);
}
