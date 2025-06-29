import { Client, LocalAuth } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import { commands } from "./commands";
import { config } from "./config";
import { log } from "./utils/logger";
import { handleAntiDelete } from "./commands/antidelete";
import { handleAntiViewOnce } from "./commands/antiviewonce";
import { onPairingQR } from "./commands/pair";

const client = new Client({
  authStrategy: new LocalAuth({ clientId: config.botName }),
  puppeteer: { args: ["--no-sandbox", "--disable-setuid-sandbox"] }
});

client.on("qr", onPairingQR);

client.on("ready", () => log(`${config.botName} WhatsApp bot is ready!`));

// Anti-delete: listen for deleted messages and restore them
client.on("message_revoke_everyone", async (after, before) => {
  // after: message after deletion, before: original message before deletion
  const msg = before || after;
  await handleAntiDelete(msg, client);
});

// Anti-view-once: always save and resend view-once media
client.on("message", async msg => {
  if (msg.hasMedia && msg.isViewOnce) {
    await handleAntiViewOnce(msg, client);
    // Also run the viewOnceCommand if you want to save to disk as well
    const viewOnceCmd = commands.find(cmd => cmd.name === "viewonce");
    if (viewOnceCmd) await viewOnceCmd.execute({ msg, client });
    return;
  }
  // Command handling by prefix
  for (const cmd of commands) {
    if (msg.body && msg.body.startsWith(`/${cmd.name}`)) {
      await cmd.execute({ msg, client });
      break;
    }
  }
});

client.initialize();