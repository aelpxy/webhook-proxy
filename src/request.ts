import { parseAttachments, parseComponents, parseEmbeds } from './parse'
import { QueryParams, WebhookResponse } from './types/api'
import { DiscordWebhookPayload } from './types/discord'

export async function makeWebhookRequest(endpoint: string, queryParams: QueryParams): Promise<WebhookResponse> {
    try {
        const payload: DiscordWebhookPayload = {
            content: queryParams.content || undefined,
            username: queryParams.username || undefined,
            avatar_url: queryParams.avatar_url || undefined,
            tts: queryParams.tts === 'true',
            flags: parseInt(queryParams.flags || '0') || undefined,
        }

        if (queryParams.embeds) {
            payload.embeds = await parseEmbeds(queryParams)
        }

        if (queryParams.components) {
            payload.components = await parseComponents(queryParams)
        }

        if (queryParams.attachments) {
            payload.attachments = await parseAttachments(queryParams)
        }

        if (queryParams.thread_name) {
            payload.thread_name = queryParams.thread_name
            if (queryParams.thread_applied_tags) {
                try {
                    payload.applied_tags = JSON.parse(queryParams.thread_applied_tags)
                } catch {
                    console.error('Invalid thread tags format')
                }
            }
        }

        Object.keys(payload).forEach(key => {
            if (payload[key as keyof DiscordWebhookPayload] === undefined) {
                delete payload[key as keyof DiscordWebhookPayload]
            }
        })

        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        })

        const responseData = await response.json().catch(() => null)

        return {
            status: response.status,
            headers: Object.fromEntries(response.headers.entries()),
            body: responseData,
            sentPayload: payload
        }
    } catch (error) {
        return {
            status: 500,
            headers: {},
            body: null,
            error: error instanceof Error ? error.message : 'Internal Server Error'
        }
    }
}
