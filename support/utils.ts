import fs from 'fs';
import { browser } from 'protractor';
import { application, resolutions } from '../data';
import { AppEnvironmnet, env } from './environment';
import { takeScreenshot } from './screenshot';

declare const allure: any;

export const getBaseUrl = (): string => {
  if (!application[env.appEnv]) {
    throw new Error('Application environment does not exists: ' + env.appEnv);
  }
  return application[env.appEnv].baseUrl;
};

export const getResolution = (): { width: number; height: number } => {
  return resolutions[env.resolution];
};

export function capitalizeFirstLetter(string: string): string {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const screenshot = async (): Promise<string> => {
  const screenshots = await takeScreenshot();

  console.log(screenshots);

  return await browser.takeScreenshot();
};

export const setExecutionInfo = async (): Promise<void> => {
  const capabilities = await browser.getCapabilities();
  allure.addArgument(
    'browser',
    // `${capabilities.get('browserName')}-${capabilities.get('version')}`
    capabilities.get('browserName')
  );
};

export const hasIntegratedEnvironment = (): boolean => {
  const integratedEnvironmnets = [AppEnvironmnet.LIVE];
  return integratedEnvironmnets.includes(<AppEnvironmnet>env.appEnv);
};

export const hasAuthentication = (): boolean => {
  const integratedEnvironmnets = [AppEnvironmnet.LIVE];
  return integratedEnvironmnets.includes(<AppEnvironmnet>env.appEnv);
};

export function listFiles(folder: string): fs.PathLike[] {
  return listDirectoryContent(folder).filter(
    (content: fs.PathLike) => !fs.statSync(content).isDirectory()
  );
}

export function listDirectoryContent(folder: string): fs.PathLike[] {
  return fs.readdirSync(folder).map((content) => {
    return `${folder}/${content}`;
  });
}

export function sortingFilesByDateModified(files: fs.PathLike[]): fs.PathLike[] {
  return files
    .map((file: fs.PathLike) => {
      return {
        name: file,
        time: fs.statSync(file).mtime.getTime(),
      };
    })
    .sort((fileA: { time: number }, fileB: { time: number }) => {
      return fileA.time - fileB.time;
    })
    .map((file: { name: any }) => {
      return file.name;
    });
}
