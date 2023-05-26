import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage } from "langchain/schema";
import {readCodeState} from "../utils"
import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

const cb = new ChatOpenAI({ openAIApiKey: apiKey, temperature: 0 });

async function testChat(msg: string) {
  const response = cb.call([new HumanChatMessage(msg)]);
  return response;
}

async function main() {
  const res = await testChat(
    "can you give html and css for a simple landing page"
  );
  console.log(res);
}

const code = readCodeState();
console.log(code.html);
