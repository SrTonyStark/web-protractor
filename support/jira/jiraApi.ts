import request from 'superagent';
import { env } from '../environment';

enum IssueStatus {
  CANCEL = 'Cancel',
  DONE = 'Done',
  FAIL = 'Fail',
  READY = 'Ready',
  TEST = 'Test',
  TODO = 'To Do',
}

enum IssueStatusId {
  CANCEL = 131,
  DONE = 301,
  FAIL = 61,
  READY = 241,
  TEST = 331,
  TODO = 351,
}

enum ExecutionStatus {
  PASS = 'passed',
  FAIL = 'failed',
}

const statusMachine = [
  {
    status: ExecutionStatus.PASS,
    actual: IssueStatus.TODO,
    next: IssueStatus.TEST,
  },
  {
    status: ExecutionStatus.PASS,
    actual: IssueStatus.TEST,
    next: IssueStatus.DONE,
  },
  {
    status: ExecutionStatus.PASS,
    actual: IssueStatus.DONE,
    next: null,
  },
  {
    status: ExecutionStatus.FAIL,
    actual: IssueStatus.TODO,
    next: IssueStatus.TEST,
  },
  {
    status: ExecutionStatus.FAIL,
    actual: IssueStatus.TEST,
    next: IssueStatus.FAIL,
  },
  {
    status: ExecutionStatus.FAIL,
    actual: IssueStatus.FAIL,
    next: null,
  },
];

function findIssueStatus(issueStatus: IssueStatus) {
  return Object.keys(IssueStatus).find((key) => IssueStatus[key] == issueStatus);
}

function getIssueStatusId(issueStatus: IssueStatus) {
  return IssueStatusId[findIssueStatus(issueStatus)];
}

function findIssueStatusById(issueStatus: string) {
  return Object.keys(IssueStatusId).find((key) => IssueStatusId[key] == issueStatus);
}

function getNextStatus(
  executionStatus: ExecutionStatus,
  issueStatus: IssueStatus
): IssueStatus | undefined {
  return (
    statusMachine.find(
      (stage) => stage.status == executionStatus && stage.actual == issueStatus
    ).next || undefined
  );
}

async function updateIssueStatus(issueKey: string, issueStatus: string): Promise<void> {
  try {
    await request
      .post(`${env.jiraUrl}/rest/api/2/issue/${issueKey}/transitions`)
      .auth(env.jiraUser, env.jiraPassword)
      // .set('Authorization', 'Basic TOKEN')
      .set('Content-type', 'application/json;charset=UTF-8')
      .send({ 'transition': { 'id': issueStatus } });
    console.log(`Update issue status ${issueKey} to ${findIssueStatusById(issueStatus)}`);
  } catch (error) {
    console.error(`An error occurred when update the status from IssueKey ${issueKey}`);
    throw error;
  }
}

async function getIssueStatus(issueKey: string): Promise<IssueStatus> {
  try {
    const response = await request
      .get(`${env.jiraUrl}/rest/api/2/issue/${issueKey}?fields=status`)
      .auth(env.jiraUser, env.jiraPassword);
    // .set('Authorization', 'Basic TOKEN')
    const content = JSON.parse(response.text);
    return content.fields.status.name;
  } catch (error) {
    console.error(`An error occurred when get the execution from IssueKey ${issueKey}`);
    throw error;
  }
}

async function getExecutionResult(issueKey: string) {
  try {
    const response = await request
      .get(`${env.jiraUrl}/rest/raven/1.0/api/testexec/${issueKey}/test`)
      .auth(env.jiraUser, env.jiraPassword);
    // .set('Authorization', 'Basic TOKEN')
    const content = JSON.parse(response.text);
    const failed =
      content.filter((result: { status: string }) => result.status == 'FAIL').length > 0;
    return failed ? ExecutionStatus.FAIL : ExecutionStatus.PASS;
  } catch (error) {
    console.error(`An error occurred when get the execution from IssueKey ${issueKey}`);
    throw error;
  }
}

export class JiraApi {
  /**
   * @example
   * updateIssue('JIRA-1234');
   */
  async updateExecutionStatus(issueKey: string): Promise<void> {
    const executionStatus = await getExecutionResult(issueKey);
    let issueStatus = await getIssueStatus(issueKey);
    while (issueStatus) {
      const nextStatus = getNextStatus(executionStatus, issueStatus);
      if (nextStatus) {
        await updateIssueStatus(issueKey, getIssueStatusId(nextStatus));
      }
      issueStatus = nextStatus;
    }
  }
}
