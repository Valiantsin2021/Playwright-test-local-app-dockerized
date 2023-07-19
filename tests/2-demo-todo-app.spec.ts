// @ts-check
export {}
import { test, expect, chromium } from '@playwright/test'
// import { playAudit } from 'playwright-lighthouse'

// let page
test.beforeEach(async ({ page }) => {
  // const browser = await chromium.launch({
  //   args: ['--remote-debugging-port=9222'],
  //   headless: false
  // })
  // const page = await browser.newPage()
  await page.goto('/')
})
const TODO_ITEMS: string[] = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    // await playAudit({
    //   page: page,
    //   thresholds: {
    //     performance: 50,
    //     accessibility: 50,
    //     'best-practices': 50,
    //     seo: 50,
    //     pwa: 50
    //   },
    //   port: 9222
    // })
    // create a new todo locator
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // Create 1st todo.
    await newTodo.fill(TODO_ITEMS[0])
    await newTodo.press('Enter')

    // Make sure the list only has one todo item.
    await expect(page.getByText(TODO_ITEMS[0])).toBeVisible()

    // Create 2nd todo.
    await newTodo.fill(TODO_ITEMS[1])
    await newTodo.press('Enter')

    // Make sure the list now has two todo items.
    await expect(page.locator('.todo')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1]])

    // Create 3d todo.
    await newTodo.fill(TODO_ITEMS[2])
    await newTodo.press('Enter')

    await expect(page.locator('.todo')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[1], TODO_ITEMS[2]])

    await expect(page.getByTestId('remaining-count')).toHaveText('3')

    await page.locator('[type="checkbox"]').nth(1).click({ force: true })
    await expect(page.getByTestId('remaining-count')).toHaveText('2')

    await page.getByTestId('filter-active').click()
    await expect(page.locator('.todo')).toHaveCount(2)
    await page.getByTestId('filter-completed').click()
    await expect(page.locator('.todo')).toHaveCount(1)
    await page.getByTestId('filter-all').click()
    await expect(page.locator('.todo')).toHaveCount(3)
    await page.locator('.destroy').nth(1).click()
    await expect(page.locator('.todo')).toHaveCount(2)
    await expect(page.locator('.todo')).toHaveText([TODO_ITEMS[0], TODO_ITEMS[2]])
  })
})
