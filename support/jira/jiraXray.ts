import request from 'superagent';
import { env } from '../environment';

const jiraApiPath: { [key: string]: string } = {
  'cucumber': '/rest/raven/1.0/import/execution/cucumber',
  'cucumberMultipart': '/rest/raven/1.0/import/execution/cucumber/multipart',
  'junit': '/rest/raven/1.0/import/execution/junit',
  'junitMultipart': '/rest/raven/1.0/import/execution/junit/multipart',
  'xray': '/rest/raven/1.0/import/execution',
  'xrayMultipart': '/rest/raven/1.0/import/execution/multipart',
};

export enum ImportResult {
  Cucumber = 'cucumber',
  CucumberMultipart = 'cucumberMultipart',
  JUnit = 'junit',
  JUnitMultipart = 'junitMultipart',
  XrayJSON = 'xray',
  XrayMultipart = 'xrayMultipart',
}

function isMultipart(result: ImportResult) {
  const allowMultipart = [
    ImportResult.CucumberMultipart,
    ImportResult.JUnitMultipart,
    ImportResult.XrayMultipart,
  ];
  return allowMultipart.includes(result);
}

async function importResult(
  importResultFormat: ImportResult,
  resultFile: string
): Promise<string> {
  try {
    const response = await request
      .post(`${env.jiraUrl}${jiraApiPath[importResultFormat]}`)
      .auth(env.jiraUser, env.jiraPassword)
      // .set('Authorization', 'Basic TOKEN')
      .set('Content-Type', 'application/json')
      .attach('result', resultFile);
    console.log(
      'The results where successfully imported to Jira:',
      response.body.testExecIssue.key
    );
    return response.body.testExecIssue.key;
  } catch (error) {
    console.error(`An error occurred when import the ${importResultFormat}`);
    throw error;
  }
}

async function importResultMultipart(
  importResultFormat: ImportResult,
  resultFile: string,
  infoFile: string
): Promise<string> {
  try {
    const response = await request
      .post(`${env.jiraUrl}${jiraApiPath[importResultFormat]}`)
      .auth(env.jiraUser, env.jiraPassword)
      // .set('Authorization', 'Basic TOKEN')
      .set('Content-Type', 'application/json')
      .attach('info', infoFile)
      .attach('result', resultFile);
    console.log(
      'The results where successfully imported to Jira:',
      response.body.testExecIssue.key
    );
    return response.body.testExecIssue.key;
  } catch (error) {
    console.error(`An error occurred when import the ${importResultFormat}`);
    throw error;
  }
}

export class JiraXray {
  async importResult(
    importResultFormat: ImportResult,
    resultFile: string,
    issueFieldsFile: string = undefined
  ): Promise<string> {
    if (isMultipart(importResultFormat)) {
      return await importResultMultipart(importResultFormat, resultFile, issueFieldsFile);
    } else {
      return await importResult(importResultFormat, resultFile);
    }
  }
}
