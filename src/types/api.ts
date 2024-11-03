import { DiscordWebhookPayload } from "./discord"

export interface WebhookResponse {
    status: number
    headers: Record<string, string>
    body: any
    sentPayload?: DiscordWebhookPayload
    error?: string
}

export interface QueryParams extends Record<string, string | undefined> {
    endpoint?: string
    content?: string
    username?: string
    avatar_url?: string
    tts?: string
    flags?: string
    embeds?: string
    embed_title?: string
    embed_description?: string
    embed_url?: string
    embed_color?: string
    embed_timestamp?: string
    embed_footer?: string
    embed_footer_icon?: string
    embed_image?: string
    embed_thumbnail?: string
    embed_author?: string
    embed_author_url?: string
    embed_author_icon?: string
    embed_fields?: string
    components?: string
    buttons?: string
    select_menus?: string
    attachments?: string
    thread_name?: string
    thread_applied_tags?: string
}