import { browser } from 'protractor';
import { application, resolutions } from '../data';
import { env } from './environment';

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
  return await browser.takeScreenshot();
};
