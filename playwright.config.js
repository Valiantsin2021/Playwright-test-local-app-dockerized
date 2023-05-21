// @ts-check
const { defineConfig, devices } = require('@playwright/test')
// require('dotenv').config();
module.exports = defineConfig({
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : 1,
  reporter: [
    ['list'],
    ['html', { open: 'never' }],
    [
      'allure-playwright',
      {
        detail: true,
        outputFolder: 'allure-results',
        suiteTitle: true
      }
    ]
  ],
  use: {
    headless: true,
    testIdAttribute: 'data-cy',
    baseURL: 'http://localhost:3000/',
    trace: 'on-first-retry'
  },
  projects: [
    {
      name: 'Test todo app',
      use: { ...devices['Desktop Chrome'] }
    }
  ],
  webServer: {
    command: 'npm run start',
    url: 'http://localhost:3000/',
    reuseExistingServer: !process.env.CI
  }
})