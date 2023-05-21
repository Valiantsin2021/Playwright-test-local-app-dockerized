// @ts-check
const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

const TODO_ITEMS = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('New Todo', () => {
  test('should allow me to add todo items', async ({ page }) => {
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

    await page.locator('[type="checkbox"]').nth(1).click()
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
