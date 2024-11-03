export type MessageFlags = {
    SUPPRESS_EMBEDS: 4,
    SUPPRESS_NOTIFICATIONS: 4096
}

export interface EmbedFooter {
    text: string
    icon_url?: string
}

export interface EmbedImage {
    url: string
    proxy_url?: string
    height?: number
    width?: number
}

export interface EmbedThumbnail {
    url: string
    proxy_url?: string
    height?: number
    width?: number
}

export interface EmbedAuthor {
    name: string
    url?: string
    icon_url?: string
    proxy_icon_url?: string
}

export interface EmbedField {
    name: string
    value: string
    inline?: boolean
}

export interface Embed {
    title?: string
    type?: "rich" | "image" | "video" | "gifv" | "article" | "link"
    description?: string
    url?: string
    timestamp?: string
    color?: number
    footer?: EmbedFooter
    image?: EmbedImage
    thumbnail?: EmbedThumbnail
    author?: EmbedAuthor
    fields?: EmbedField[]
}

export type ButtonStyle = 1 | 2 | 3 | 4 | 5

export interface Button {
    type: 2
    style: ButtonStyle
    label: string
    emoji?: {
        id?: string
        name?: string
        animated?: boolean
    }
    custom_id?: string
    url?: string
    disabled?: boolean
}

export interface SelectOption {
    label: string
    value: string
    description?: string
    emoji?: {
        id?: string
        name?: string
        animated?: boolean
    }
    default?: boolean
}

export interface SelectMenu {
    type: 3
    custom_id: string
    options: SelectOption[]
    placeholder?: string
    min_values?: number
    max_values?: number
    disabled?: boolean
}

export interface ActionRow {
    type: 1
    components: (Button | SelectMenu)[]
}

export interface Attachment {
    id: string
    filename: string
    description?: string
    content_type?: string
    size?: number
    url: string
    proxy_url?: string
    height?: number
    width?: number
    ephemeral?: boolean
}

export interface DiscordWebhookPayload {
    content?: string
    username?: string
    avatar_url?: string
    tts?: boolean
    flags?: number
    embeds?: Embed[]
    components?: ActionRow[]
    attachments?: Attachment[]
    thread_name?: string
    applied_tags?: string[]
    allowed_mentions?: {
        parse?: ("roles" | "users" | "everyone")[]
        roles?: string[]
        users?: string[]
        replied_user?: boolean
    }
}
