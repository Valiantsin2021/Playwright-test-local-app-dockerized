// @ts-check
import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('/')
})
const TODO_ITEMS: string[] = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
    const newTodo = page.getByPlaceholder('What needs to be done?')
    async function checkOverflow(selector) {
      const overflow = await page.evaluate(selector => {
        const element = document.querySelector(selector)
        return element.clientHeight === element.scrollHeight && element.clientWidth === element.scrollWidth
      }, selector)
      expect(overflow, 'does overflow').toBe(true)
    }
    await checkOverflow('.new-todo')

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
