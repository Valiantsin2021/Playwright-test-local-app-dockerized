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
  test(`See the previously set up test conditions in BeforeEach hook`, async ({ page }) => {
    await expect(page.getByText(TODO_ITEMS.join(' '))).toBeVisible()
  })
  test.afterEach(async ({ page, request }) => {
    const todos = await page.locator('.todo').count()
    for (let i = 1; i <= todos; i++) {
      await request.delete(`/todos/${i}`)
    }
  })
  test(`create new todo and intercept the request`, async ({ page }) => {
    await page.route('/todos', async route => {
      if (route.request().method() === 'POST') {
        const response = await route.fetch()
        const json = await response.json()
        console.log(json)
        json.title = 'NOT SUPER TODO'
        console.log(json)
        await route.fulfill({ response, json })
      }
    })
    await page.goto('./')
    const newTodo = page.getByPlaceholder('What needs to be done?')

    // Create 1st todo.
    await newTodo.fill('SUPER TODO')
    const responsePromise = page.waitForResponse(
      response => response.url() === 'http://localhost:3000/todos' && response.status() === 201
    )
    await newTodo.press('Enter')
    const response = await responsePromise
    // console.log(response)
    await expect(page.getByText('SUPER TODO')).toBeVisible()
  })
})
