import { APIRequestContext } from 'playwright-core'
import chalk from 'chalk'
import eyes from 'eyes'

export default class API {
  private request: APIRequestContext

  constructor(request: APIRequestContext) {
    this.request = request
  }
  static inspect = eyes.inspector({
    maxLength: false,
    pretty: true,
    hideFunctions: false,
    stream: process.stdout
  })
  static color = {
    success: chalk.bold.hex('#0EF15D'),
    error: chalk.bold.hex('#E4271B'),
    warning: chalk.bold.hex('#FFA500'),
    info: chalk.hex('#A020F0'),
    outgoingRequest: chalk.hex('#0560fc'),
    incomingRequest: chalk.hex('#fcf805'),
    request: chalk.hex('#0560fc'),
    response: chalk.hex('#fcf805')
  }
  /**
   * Logs a request to the console based on the provided URL and data.
   * @property {Function} logRequest Logs a request to the console based on the provided URL and data.
   * @returns {Promise<void>}
   * @param {string} URL - Request URL.
   * @param {object} data - Request body.
   */

  static async logRequest(URL, data) {
    console.log(
      this.color.request(
        `\n<<<<<<<<<<<<<<<<< SENDING REQUEST <<<<<<<<<<<<<<<<<\nRequest URL: \n${this.color.info(
          URL
        )}\nRequest data: \n`
      )
    )
    this.inspect(data)
    console.log(this.color.request('<<<<<<<<<<<<<<<<< END OF REQUEST <<<<<<<<<<<<<<<<<'))
  }

  /**
   * Logs a response to the console based on the provided status and data.
   * @property {Function} logResponse Logs a response to the console based on the provided status and data.
   * @returns {Promise<void>}
   * @param {string} status - Response status.
   * @param {object} data - Response body.
   */

  static async logResponse(status, data) {
    console.log(
      this.color.response(
        `\n<<<<<<<<<<<<<<<<< RECEIVING RESPONSE <<<<<<<<<<<<<<<<<\nResponse status: \n${this.color.info(
          status
        )}\nResponse data: \n`
      )
    )
    this.inspect(data)
    console.log(this.color.response('<<<<<<<<<<<<<<<<< END OF RESPONSE <<<<<<<<<<<<<<<<<'))
  }

  private async makeRequest(endpoint: string, method: string, reqBody?: object, token?: string) {
    API.logRequest(endpoint, reqBody ?? null)
    const res = await this.request[method](endpoint, {
      headers: token ? { Cookie: `token=${token}` } : {},
      data: reqBody ? reqBody : undefined
    })
    res.json() ? API.logResponse(res.status(), res.json()) : API.logResponse(res.status(), res.text())
    return res
  }
  async postReq(endpoint: string, reqBody: object) {
    return this.makeRequest(endpoint, 'post', reqBody ?? null)
  }

  async getReq(endpoint: string) {
    return this.makeRequest(endpoint, 'get')
  }

  async putReq(endpoint: string, reqBody: object, token: string = null) {
    return this.makeRequest(endpoint, 'put', reqBody, token)
  }

  async patchReq(endpoint: string, reqBody: object, token: string = null) {
    return this.makeRequest(endpoint, 'patch', reqBody, token)
  }

  async deleteReq(endpoint: string, token: string = null) {
    return this.makeRequest(endpoint, 'delete', undefined, token)
  }
}
