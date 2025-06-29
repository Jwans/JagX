import { Command } from "../types";
import { log } from "../utils/logger";

/**
 * Antidelete handler: logs and sends back deleted messages.
 * Should be registered in the main index.ts on 'message_revoke_everyone' event.
 */
export const antiDeleteCommand: Command = {
  name: "antidelete",
  description: "Allows deleted messages to be seen by group or chat members.",
  execute: async ({ msg, client }) => {
    // This command is passive and should be handled in the event listener,
    // not as a chat command.
    // Left empty intentionally.
  }
};

/**
 * Handler function to be used in the main event listener.
 */
export const handleAntiDelete = async (msg: any, client: any) => {
  try {
    // Only act if message was deleted for everyone
    if (msg.body || msg.hasMedia) {
      let messageInfo = `🕵️‍♂️ *Anti-Delete Detected*\n`;
      if (msg.author) messageInfo += `👤 Sender: @${msg.author.split("@")[0]}\n`;
      if (msg.body) messageInfo += `💬 Message: ${msg.body}\n`;

      if (msg.hasMedia) {
        const media = await msg.downloadMedia();
        if (media) {
          await msg.getChat().then((chat: any) => {
            chat.sendMessage(messageInfo, { mentions: [msg.author] });
            chat.sendMessage(media);
          });
        } else {
          await msg.getChat().then((chat: any) => {
            chat.sendMessage(messageInfo, { mentions: [msg.author] });
          });
        }
      } else {
        await msg.getChat().then((chat: any) => {
          chat.sendMessage(messageInfo, { mentions: [msg.author] });
        });
      }
      log("Anti-delete: Restored deleted message");
    }
  } catch (e) {
    log(`Error in anti-delete handler: ${e}`);
  }
};
