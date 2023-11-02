import { test as base } from '@playwright/test'
import api from '../utils/apiUtils'
type MyFixtures = {
  API: api
}
const fixtures = base.extend<MyFixtures>({
  API: async ({ request }, use) => {
    const API = new api(request)
    await use(API)
  }
})
export { fixtures }
export { expect } from '@playwright/test'
