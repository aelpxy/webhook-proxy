import { QueryParams } from './types/api'
import { ActionRow, Attachment, Button, Embed, SelectMenu } from './types/discord'

export async function parseEmbeds(queryParams: QueryParams): Promise<Embed[]> {
    try {
        return JSON.parse(queryParams.embeds!) as Embed[]
    } catch {
        const embed: Embed = {
            title: queryParams.embed_title || undefined,
            type: "rich",
            description: queryParams.embed_description || undefined,
            url: queryParams.embed_url || undefined,
            timestamp: queryParams.embed_timestamp || new Date().toISOString(),
            color: parseInt(queryParams.embed_color || '0') || undefined,
            footer: queryParams.embed_footer ? {
                text: queryParams.embed_footer,
                icon_url: queryParams.embed_footer_icon
            } : undefined,
            image: queryParams.embed_image ? {
                url: queryParams.embed_image
            } : undefined,
            thumbnail: queryParams.embed_thumbnail ? {
                url: queryParams.embed_thumbnail
            } : undefined,
            author: queryParams.embed_author ? {
                name: queryParams.embed_author,
                url: queryParams.embed_author_url,
                icon_url: queryParams.embed_author_icon
            } : undefined,
            fields: queryParams.embed_fields ?
                JSON.parse(queryParams.embed_fields) :
                undefined
        }
        return [embed]
    }
}

export async function parseComponents(queryParams: QueryParams): Promise<ActionRow[]> {
    try {
        return JSON.parse(queryParams.components!) as ActionRow[]
    } catch {
        const components: ActionRow[] = []

        if (queryParams.buttons) {
            const buttonRow: ActionRow = {
                type: 1,
                components: JSON.parse(queryParams.buttons) as Button[]
            }
            components.push(buttonRow)
        }

        if (queryParams.select_menus) {
            const selectRow: ActionRow = {
                type: 1,
                components: JSON.parse(queryParams.select_menus) as SelectMenu[]
            }
            components.push(selectRow)
        }

        return components
    }
}

export async function parseAttachments(queryParams: QueryParams): Promise<Attachment[]> {
    try {
        return JSON.parse(queryParams.attachments!) as Attachment[]
    } catch {
        console.error('Invalid attachments format')
        return []
    }
}