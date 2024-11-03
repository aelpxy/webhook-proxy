import { Context } from 'hono'

import { makeWebhookRequest } from '../request'
import { QueryParams } from '../types/api'
import { isValidDiscordWebhook } from '../validators'

export async function handleWebhookDebug(c: Context) {
  const { type } = c.req.param()

  if (type !== 'discord') {
    return c.json({
      success: false,
      error: `The provided value "${type}" is not accepted by the proxy.`
    }, 400)
  }

  const endpoint = c.req.query('endpoint')
  if (!endpoint) {
    return c.json({
      success: false,
      error: 'You have to provide the "endpoint" query parameter.'
    }, 400)
  }

  if (!isValidDiscordWebhook(endpoint)) {
    return c.json({
      success: false,
      error: 'Invalid Discord webhook URL provided.'
    }, 400)
  }

  if (type === 'discord') {
    const queryParams = Object.fromEntries(
      new URL(c.req.url).searchParams.entries()
    ) as QueryParams

    const result = await makeWebhookRequest(endpoint, queryParams)

    return c.json({
      success: result.status >= 200 && result.status < 300,
      debug: {
        request: {
          url: endpoint,
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: result.sentPayload
        },
        response: {
          status: result.status,
          headers: result.headers,
          body: result.body
        }
      }
    })
  }

  return c.json({ success: false, error: 'An unknown error occurred' }, 500)
}
