import OpenAI from "openai";
import { config } from "../config";
import { Command } from "../types";

const openai = new OpenAI({ apiKey: config.openaiApiKey });

export const aiCommand: Command = {
  name: "ai",
  description: "Ask JagX (GPT-4.1) anything!",
  execute: async ({ msg }) => {
    const prompt = msg.body.replace("/ai ", "");
    const response = await openai.responses.create({
      model: "gpt-4.1",
      input: prompt,
    });
    await msg.reply(response.output_text);
  }
};