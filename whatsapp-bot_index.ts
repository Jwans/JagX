import { createServer } from "http";
import { Client, LocalAuth, MessageMedia } from "whatsapp-web.js";
import qrcode from "qrcode-terminal";
import OpenAI from "openai";
import fs from "fs";
import path from "path";

// Initialize OpenAI
const openai = new OpenAI();

// WhatsApp client initialization
const client = new Client({
    authStrategy: new LocalAuth({ clientId: "JagX" }),
    puppeteer: {
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
    },
});

// Store view-once media
const VIEW_ONCE_DIR = path.join(__dirname, "view_once_media");
if (!fs.existsSync(VIEW_ONCE_DIR)) fs.mkdirSync(VIEW_ONCE_DIR);

// Generate QR code for pairing on deployment
client.on("qr", (qr: string) => {
    qrcode.generate(qr, { small: true });
    console.log("Scan this QR code with your WhatsApp to pair the bot.");
});

// Set bot profile after ready
client.on("ready", async () => {
    console.log("JagX WhatsApp bot is ready!");
    const profilePic = "./JagX-profile.jpg";
    if (fs.existsSync(profilePic)) {
        await client.setProfilePicture(profilePic);
    }
    await client.setDisplayName("JagX");
});

// Handle incoming messages
client.on("message", async msg => {
    try {
        if (msg.body.startsWith("/ai ")) {
            const prompt = msg.body.replace("/ai ", "");
            const response = await openai.responses.create({
                model: "gpt-4.1",
                input: prompt,
            });
            await msg.reply(response.output_text);
        } else if (msg.type === "view_once") {
            // Save view-once media
            const media = await msg.downloadMedia();
            if (media) {
                const filePath = path.join(VIEW_ONCE_DIR, `${Date.now()}-${msg.id.id}.${media.mimetype.split("/")[1]}`);
                fs.writeFileSync(filePath, media.data, { encoding: "base64" });
                await msg.reply("JagX has saved this view-once media. 😉");
            }
        } else if (msg.body.startsWith("/remove ")) {
            // Remove user from group (admin only)
            if (msg.fromMe || msg.author === msg.from) {
                const userToRemove = msg.body.split(" ")[1];
                const chat = await msg.getChat();
                if (chat.isGroup) {
                    await chat.removeParticipants([userToRemove]);
                    await msg.reply(`Removed ${userToRemove} from group.`);
                }
            }
        } else if (msg.body.startsWith("/hack")) {
            await msg.reply("Playful hacking is not supported. 😉");
        } else if (msg.body.startsWith("/music ")) {
            // Download and play music (YouTube DL not included, just a stub)
            const query = msg.body.replace("/music ", "");
            await msg.reply(`Pretending to download and play "${query}". (Implement audio streaming here)`);
        } else if (msg.body.startsWith("/react ")) {
            // React to status (not supported in whatsapp-web.js as of now)
            await msg.reply("Reacting to status is not supported by the library yet.");
        } else if (msg.body.startsWith("/pair")) {
            // Re-generate pairing QR code
            client.logout();
            await client.initialize();
        }
    } catch (e) {
        await msg.reply("Oops! Something went wrong.");
        console.error(e);
    }
});

// Accept phone numbers for chat (auto-connect)
client.on("message_create", async msg => {
    if (msg.body.startsWith("/chat ")) {
        const number = msg.body.split(" ")[1].replace(/[^0-9]/g, "");
        const chatId = `${number}@c.us`;
        await client.sendMessage(chatId, "Hi! JagX here. How can I help you?");
    }
});

// Simple HTTP server for Render deployment health check
createServer((req, res) => {
    res.writeHead(200);
    res.end("JagX WhatsApp bot running.");
}).listen(process.env.PORT || 3000);

// Start client
client.initialize();