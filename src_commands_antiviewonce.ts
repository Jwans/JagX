import { Command } from "../types";
import { saveViewOnceMedia } from "../utils/media";
import { log } from "../utils/logger";

/**
 * Anti-view-once handler: saves and resends view-once media so it's always accessible.
 * Should be called on 'message' event for view-once media.
 */
export const antiViewOnceCommand: Command = {
  name: "antiviewonce",
  description: "Prevents view-once media from being lost. Media is saved and resent.",
  execute: async ({ msg, client }) => {
    // This command is passive and should be handled in the event listener,
    // not as a chat command.
    // Left empty intentionally.
  }
};

/**
 * Handler function to be used in the main event listener.
 */
export const handleAntiViewOnce = async (msg: any, client: any) => {
  try {
    if (msg.hasMedia && msg.isViewOnce) {
      const media = await msg.downloadMedia();
      if (media) {
        const fileName = saveViewOnceMedia(media, msg.id.id);
        const chat = await msg.getChat();
        await chat.sendMessage(
          `👁️‍🗨️ *Anti-View-Once*\nSaved media as: ${fileName}\nResending for permanent viewing...`
        );
        await chat.sendMessage(media, { caption: "🔄 Resent by JagX Anti-View-Once" });
        log(`Anti-view-once: Saved and resent view-once media (${fileName})`);
      }
    }
  } catch (e) {
    log(`Error in anti-view-once handler: ${e}`);
  }
};
