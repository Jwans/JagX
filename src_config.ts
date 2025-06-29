import dotenv from "dotenv";
dotenv.config();

export const config = {
  openaiApiKey: process.env.OPENAI_API_KEY || "",
  port: process.env.PORT ? parseInt(process.env.PORT) : 3000,
  profilePic: process.env.PROFILE_PIC || "./JagX-profile.jpg",
  botName: "JagX"
};