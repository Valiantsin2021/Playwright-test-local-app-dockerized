// @ts-check
export {}
const { test, expect } = require('@playwright/test')

test.beforeEach(async ({ page }) => {
  await page.goto('./')
})

const TODO_ITEMS: string[] = ['buy some cheese', 'feed the cat', 'book a doctors appointment']

test.describe('New Todo via requests', () => {
  test('should allow me to add todo itemsvia API', async ({ page, request }) => {
    await page.goto('http://localhost:3000/')
    for (const todo of TODO_ITEMS) {
      await request.post('http://localhost:3000/todos', {
        data: {
          title: todo,
          completed: false
        }
      })
      await page.reload()
      await expect(page.getByText(todo)).toBeVisible()
    }
    const todos = await request.get('http://localhost:3000/todos')
    console.log(await todos.json())
    for (let i = 0; i < TODO_ITEMS.length; i++) {
      await request.delete(`http://localhost:3000/todos/${i + 1}`)
      await page.reload()
      await expect(page.getByTestId('remaining-count')).toHaveText(`${TODO_ITEMS.length - (i + 1)}`)
      await expect(page.getByText(TODO_ITEMS[i])).toBeHidden()
      await expect(page.locator('.todo')).toHaveCount(TODO_ITEMS.length - (i + 1))
    }
  })
})
