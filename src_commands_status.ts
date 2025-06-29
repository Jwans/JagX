import { Command } from "../types";
import { log } from "../utils/logger";
import schedule from "node-schedule";
import { MessageMedia } from "whatsapp-web.js";
import fs from "fs";

interface ScheduledStatus {
  time: string;
  message: string;
  mediaPath?: string;
}

const scheduledStatuses: ScheduledStatus[] = [];

export const statusCommand: Command = {
  name: "status",
  description: "Schedule a WhatsApp status post. Usage: /status <YYYY-MM-DD HH:mm> <message> [media-path]",
  execute: async ({ msg, client }) => {
    try {
      const parts = msg.body.match(/^\/status\s+([0-9-]+\s[0-9:]+)\s+(.+?)(?:\s+(.+))?$/);
      if (!parts) {
        await msg.reply("Invalid format. Usage: /status <YYYY-MM-DD HH:mm> <message> [media-path]");
        return;
      }
      const [, dateTime, message, mediaPath] = parts;
      if (Date.parse(dateTime) <= Date.now()) {
        await msg.reply("Please provide a future date and time.");
        return;
      }
      scheduledStatuses.push({ time: dateTime, message, mediaPath });

      schedule.scheduleJob(new Date(dateTime), async () => {
        try {
          if (mediaPath && fs.existsSync(mediaPath)) {
            const media = MessageMedia.fromFilePath(mediaPath);
            await client.sendMessage("status@broadcast", media, { caption: message });
          } else {
            await client.sendMessage("status@broadcast", message);
          }
          log(`Posted scheduled status: ${message}`);
        } catch (e) {
          log(`Failed to post scheduled status: ${e}`);
        }
      });

      await msg.reply(`Scheduled status for ${dateTime}: "${message}"${mediaPath ? ` with media from ${mediaPath}` : ""}`);
    } catch (e) {
      await msg.reply("Error scheduling status.");
    }
  }
};
