import fs from "fs";
import path from "path";

export const saveViewOnceMedia = (media: any, msgId: string) => {
  const dir = path.join(__dirname, "../../view_once_media");
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  const ext = media.mimetype.split("/")[1];
  const filename = `${msgId}.${ext}`;
  fs.writeFileSync(path.join(dir, filename), media.data, { encoding: "base64" });
  return filename;
};