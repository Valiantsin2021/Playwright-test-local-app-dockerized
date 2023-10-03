import { test } from '@playwright/test'
import { playAudit } from 'playwright-lighthouse'
test.describe.parallel('web performance tests', () => {
  /**
   * In this test we use request.timing()
   * to to return timing information about the request
   * @see https://playwright.dev/docs/api/class-request#request-timing
   */
  test('Get resource timing of request', async ({ page }) => {
    const [request] = await Promise.all([
      page.waitForEvent('requestfinished'),
      page.goto('https://playwright.dev/docs/api/class-request')
    ])
    console.log(request.timing())
  })

  /**
   * In this test we start CDPSession to talk to DevTools
   * and a simulate a slow network connection
   * @see https://playwright.dev/docs/api/class-cdpsession
   */
  test('Simulate slow network connection', async ({ page }) => {
    const client = await page.context().newCDPSession(page)
    await client.send('Network.enable')
    await client.send('Network.emulateNetworkConditions', {
      offline: false,
      downloadThroughput: (2 * 1024 * 1024) / 4,
      uploadThroughput: (3 * 1024 * 1024) / 4,
      connectionType: 'cellular2g',
      latency: 10
    })
    await page.goto('https://playwright.dev/docs/api/class-request')
  })

  /**
   * In this test we use playwright-lighhouse package
   * to audit performance of the page
   * @see https://www.npmjs.com/package/playwright-lighthouse
   */
  test('Run Lighthouse Audit', async ({ playwright }) => {
    const browser = await playwright.chromium.launch({
      headless: true,
      args: ['--remote-debugging-port=9222']
    })
    const page = await browser.newPage()
    await page.goto('/')

    await playAudit({
      page: page,
      ignoreError: true,
      port: 9222,
      thresholds: {
        performance: 70,
        accessibility: 50,
        'best-practices': 50,
        seo: 50,
        pwa: 30
      },
      reports: {
        formats: {
          html: true
        },
        name: `lighthouse-${new Date().getTime()}`,
        directory: `${process.cwd()}/lighthouse`
      }
    })

    await browser.close()
  })
  test(`requests`, async ({ browser }, testInfo) => {
    // console.log(browser.browserType())
    console.log(testInfo.config)
  })
})
