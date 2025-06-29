import { isAdmin } from "../utils/permissions";
import { Command } from "../types";

export const removeCommand: Command = {
  name: "remove",
  description: "Remove a user from the group (admin only). Usage: /remove <phonenumber>@c.us",
  execute: async ({ msg }) => {
    if (!(await isAdmin(msg))) {
      await msg.reply("You must be a group admin to use this command.");
      return;
    }
    const userToRemove = msg.body.split(" ")[1];
    const chat = await msg.getChat();
    if (chat.isGroup) {
      await chat.removeParticipants([userToRemove]);
      await msg.reply(`Removed ${userToRemove} from group.`);
    }
  }
};