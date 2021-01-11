/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import fs from 'fs';
import path from 'path';
import moment from 'moment';
import { browser } from 'protractor';
import { HookScenarioResult } from 'cucumber';

const OUTPUT_DIR = './logs';

export function getLogName(scenario: HookScenarioResult): string {
  const scenarioTime = moment().format('YYYYMMDDHHmmssSSS');
  const scenarioId = scenario.pickle.tags
    .find((tag) => /\w+-\d+/.test(tag.name))
    .name.substr(1);
  return `${scenarioTime}_${scenarioId}`;
}

export async function generateLogs(baseFileName: string): Promise<void> {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
  await getLog(baseFileName, 'driver');
  await getLog(baseFileName, 'browser');
}

async function getLog(baseFileName: string, logType: string): Promise<void> {
  const browserLogs = await browser.manage().logs().get(logType);
  const logFileName = `${baseFileName}_${logType}.log`;
  browserLogs.forEach((logInfo) => {
    if (!logInfo.message.includes('DevTools')) {
      fs.appendFileSync(
        path.join(OUTPUT_DIR, logFileName),
        JSON.stringify({
          'date': moment(logInfo.timestamp).format('DD-MM-YYYY HH:mm:ss.SSS'),
          'level': logInfo.level.name,
          'message': logInfo.message,
        }) + '\n',
        'utf8'
      );
    }
  });
}
