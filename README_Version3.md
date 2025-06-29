...
## Features

- 🤖 **Smart AI Replies**: `/ai <prompt>` – Get GPT-4.1 answers.
- 📲 **Easy Setup & Pairing**: Pairs with QR code; `/pair` command regenerates code and shows QR for phone scan.
- 👀 **Save View Once Media**: View-once messages are saved and resent automatically (`anti-view-once`).
- 🔒 **Anti-Delete**: Deleted messages are restored and shown to the group or chat (`anti-delete`).
- 🙋 **Group Management**: `/remove <phonenumber>@c.us` removes a group member (admin only).
- ⚡ **Schedule Status**: `/status <YYYY-MM-DD HH:mm> <message> [media-path]`
- 🎵 **Play Music (Stub)**: `/music <query>` pretends to play music.
- 😀 **Initiate Chat**: `/chat <phonenumber>` starts a chat.
- 😏 **Playful Hacking**: `/hack` for fun responses.
- 🦄 **Profile**: Bot shows as `JagX`.

...

## Anti-Delete & Anti-View-Once

- **Anti-Delete:** If someone deletes a message in a chat where the bot is present, the bot will repost what was deleted, including media.
- **Anti-View-Once:** If someone sends view-once media, the bot automatically saves and resends it so it can be seen more than once, and saves it in `view_once_media/`.

## Pairing

- On first deploy, scan the QR code from the logs to pair.
- You can regenerate the pairing QR code at any time with `/pair` (the code is output to server/deployment logs for scanning).

...