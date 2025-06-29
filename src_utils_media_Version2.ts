import fs from "fs";
import path from "path";

/**
 * Saves Base64-encoded media to the view_once_media directory.
 * @param media - Media object from whatsapp-web.js
 * @param msgId - Unique message id
 * @returns The saved file name
 */
export const saveViewOnceMedia = (media: any, msgId: string) => {
  const dir = path.join(process.cwd(), "view_once_media");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const ext = media.mimetype.split("/")[1] || "bin";
  const filename = `${msgId}.${ext}`;
  fs.writeFileSync(path.join(dir, filename), media.data, { encoding: "base64" });
  return filename;
};