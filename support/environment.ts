export const env = {
  browser: process.env.BROWSER || 'chrome',
  ci: (process.env.CI && JSON.parse(process.env.CI)) || false,
  headless: (process.env.HEADLESS && JSON.parse(process.env.HEADLESS)) || false,
  directConnect: (process.env.DIRECT && JSON.parse(process.env.DIRECT)) || true,
  seleniumGrid: process.env.GRID || undefined,
  xray: (process.env.XRAY && JSON.parse(process.env.XRAY)) || false,
  jiraUrl: process.env.JIRA_URL || undefined,
  jiraUser: process.env.JIRA_USERNAME || undefined,
  jiraPassword: process.env.JIRA_PASSWORD || undefined,
  appEnv: process.env.APP_ENV || 'live',
  resolution: process.env.RESOLUTION || 'desktop',
  userId: process.env.USER_ID || 0,
};

export function listEnvVariables(): void {
  console.log('Environment VARS:', JSON.stringify(env));
}
