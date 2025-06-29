import { Command } from "../types";
import { log } from "../utils/logger";
import qrcode from "qrcode-terminal";

/**
 * Command to regenerate or show the WhatsApp pairing QR code.
 * Usage: /pair
 */
export const pairCommand: Command = {
  name: "pair",
  description: "Regenerate and show the WhatsApp pairing QR code.",
  execute: async ({ msg, client }) => {
    try {
      // Logout and reinitialize to generate new QR code
      await client.logout();
      await client.initialize();
      await msg.reply(
        "🔄 Generating a new pairing QR code. Please check your deployment logs/console for the code!"
      );
      log("Pairing code regenerated on user request.");
    } catch (e) {
      await msg.reply("❌ Could not regenerate pairing code.");
      log(`Error in /pair command: ${e}`);
    }
  }
};

/**
 * Handler for showing the QR on new session, should be in index.ts
 */
export const onPairingQR = (qr: string) => {
  qrcode.generate(qr, { small: true });
  log("Pairing QR code generated! Scan with WhatsApp.");
};
