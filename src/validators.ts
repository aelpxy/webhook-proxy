export function isValidDiscordWebhook(url: string): boolean {
    try {
        const webhookUrl = new URL(url)
        return webhookUrl.hostname === 'discord.com' &&
            webhookUrl.pathname.startsWith('/api/webhooks/')
    } catch {
        return false
    }
}
