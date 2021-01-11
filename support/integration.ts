import * as dotenv from 'dotenv';
import path from 'path';
import { env } from './environment';
import { JiraApi } from './jira/jiraApi';
import { ImportResult, JiraXray } from './jira/jiraXray';
import { listFiles, sortingFilesByDateModified } from './utils';

dotenv.config();

if (!env.xray) {
  process.exit(0);
}

const reportFolder = path.join(__dirname, '../../reports');
const dataFolder = path.join(__dirname, '../../data');

const jiraXray = new JiraXray();
const jiraApi = new JiraApi();

// Jira Xray
(async () => {
  const executionResultFile = sortingFilesByDateModified(
    listFiles(reportFolder)
  ).reverse();
  const executionIssueKey = await jiraXray.importResult(
    ImportResult.CucumberMultipart,
    executionResultFile[0].toString(),
    `${dataFolder}/jiraIssueFields.json`
  );
  await jiraApi.updateExecutionStatus(executionIssueKey);
})();
