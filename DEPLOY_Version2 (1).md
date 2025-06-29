# Deploy JagX WhatsApp Bot

## Render.com

1. **Push your code to GitHub.**
2. **Create a new Web Service** on [Render](https://dashboard.render.com/):
   - Connect your repository.
   - Set build command: `npm install && npm run build`
   - Set start command: `npm start`
   - Add environment variable: `OPENAI_API_KEY` with your OpenAI key
   - (Optional) Add `PORT=3000`
3. **First time pairing:**
   - Open the Render service logs.
   - Scan the QR code shown in logs with WhatsApp to pair the bot.

## Docker

1. **Build image:**
   ```bash
   docker build -t jagx-whatsapp-bot .
   ```
2. **Run:**
   ```bash
   docker run --env OPENAI_API_KEY=sk-xxx -p 3000:3000 jagx-whatsapp-bot
   ```
3. **Pair via logs QR code.**

## Status Scheduler

- Use `/status <YYYY-MM-DD HH:mm> <message> [media-path]` in a chat with the bot.
- Example:
  ```
  /status 2025-07-01 09:00 Good morning, world!
  ```
  or
  ```
  /status 2025-07-01 09:00 Sunrise photo ./media/sunrise.jpg
  ```

**Note:** Media path is relative to container or working directory. For Render, upload media before referencing.

---