import { Injectable } from "@nestjs/common";

import axios from "axios";

import { config } from "@Domain/config";

@Injectable()
export class TelegramService {
    private readonly TELEGRAM_BOT_TOKEN = config.TELEGRAM_BOT_TOKEN;
    private readonly TELEGRAM_CHAT_ID = config.TELEGRAM_CHAT_ID;
    private readonly API_URL = `https://api.telegram.org/bot${this.TELEGRAM_BOT_TOKEN}/sendMessage`;

    async sendMessage(message: string): Promise<void> {
        try {
            await axios.post(this.API_URL, {
                chat_id: this.TELEGRAM_CHAT_ID,
                text: message,
                parse_mode: "Markdown",
            });
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (error) {
            console.error("Failed to send Telegram message:", error);
        }
    }
}
