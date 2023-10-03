// @ts-check
import { test, expect } from '@playwright/test'
const TODO_ITEMS: string[] = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('New Todo via requests', () => {
  test.beforeEach(async ({ page, request }) => {
    await page.goto('./')
    for (const todo of TODO_ITEMS) {
      await request.post('/todos', {
        data: {
          title: todo,
          completed: false
        }
      })
    }
    await page.reload()
  })
  test.afterEach(async ({ page, request }) => {
    const todos = await page.locator('.todo').count()
    for (let i = 1; i <= todos; i++) {
      const response = await request.delete(`/todos/${i}`)
      console.log(response.status())
    }
  })
  test('should allow me to POST and DELETE todo items via API', async ({ page, request }) => {
    for (const todo of TODO_ITEMS) {
      await expect(page.getByText(todo)).toBeVisible()
    }
    const todos = await request.get('/todos')
    console.log(await todos.json())
    for (let i = 0; i < TODO_ITEMS.length; i++) {
      await request.delete(`/todos/${i + 1}`)
      await page.reload()
      await expect(page.getByTestId('remaining-count')).toHaveText(`${TODO_ITEMS.length - (i + 1)}`)
      await expect(page.getByText(TODO_ITEMS[i])).toBeHidden()
      await expect(page.locator('.todo')).toHaveCount(TODO_ITEMS.length - (i + 1))
    }
  })
})
