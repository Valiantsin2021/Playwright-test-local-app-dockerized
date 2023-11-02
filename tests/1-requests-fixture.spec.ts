// @ts-check
import { fixtures as test, expect } from '../fixtures/fixture'
const TODO_ITEMS: string[] = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('New Todo via requests', () => {
  test.beforeEach(async ({ page, API }) => {
    await page.goto('./')
    for (const todo of TODO_ITEMS) {
      await API.postReq('/todos', {
        title: todo,
        completed: false
      })
    }
    await page.reload()
  })
  test.afterEach(async ({ page, API }) => {
    const todos = await page.locator('.todo').count()
    for (let i = 1; i <= todos; i++) {
      const response = await API.deleteReq(`/todos/${i}`, null)
      console.log(response.status())
    }
  })
  test('should allow me to POST and DELETE todo items via API', async ({ page, API }) => {
    for (const todo of TODO_ITEMS) {
      await expect(page.getByText(todo)).toBeVisible()
    }
    const todos = await API.getReq('/todos')
    console.log(await todos.json())
    for (let i = 0; i < TODO_ITEMS.length; i++) {
      await API.deleteReq(`/todos/${i + 1}`, null)
      await page.reload()
      await expect(page.getByTestId('remaining-count')).toHaveText(`${TODO_ITEMS.length - (i + 1)}`)
      await expect(page.getByText(TODO_ITEMS[i])).toBeHidden()
      await expect(page.locator('.todo')).toHaveCount(TODO_ITEMS.length - (i + 1))
    }
  })
})
