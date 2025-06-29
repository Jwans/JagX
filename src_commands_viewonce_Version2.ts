import { Command } from "../types";
import { saveViewOnceMedia } from "../utils/media";
import { log } from "../utils/logger";

/**
 * Command to save view-once media sent to the bot.
 * Usage: Send a view-once image/video directly to the bot or in a group where the bot is present.
 */
export const viewOnceCommand: Command = {
  name: "viewonce",
  description: "Saves view-once media automatically when received.",
  execute: async ({ msg }) => {
    try {
      // Only handle view-once media
      if (msg.hasMedia && msg.isViewOnce) {
        const media = await msg.downloadMedia();
        if (media) {
          const fileName = saveViewOnceMedia(media, msg.id.id);
          await msg.reply(
            `✅ View-once media has been saved as: ${fileName}\n(Only you can see this confirmation)`
          );
          log(`Saved view-once media: ${fileName}`);
        } else {
          await msg.reply("❌ Failed to download the view-once media.");
        }
      }
    } catch (e) {
      await msg.reply("❌ Error saving view-once media.");
      log(`Error saving view-once media: ${e}`);
    }
  }
};