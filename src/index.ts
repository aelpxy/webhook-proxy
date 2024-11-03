import { Hono } from 'hono'
import { cors } from 'hono/cors'
import { handleWebhookDebug } from './handlers/webhookHandler'

const app = new Hono()

app.use('/*', cors())
app.get('/debug/:type', handleWebhookDebug)
app.get('/health', (c) => c.json({ status: 'ok' }))

export default app