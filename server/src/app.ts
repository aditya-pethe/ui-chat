import express from "express";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { HumanChatMessage, SystemChatMessage } from "langchain/schema";
import { BufferMemory } from "langchain/memory";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";

import dotenv from "dotenv";
import { Chatbot } from "./ui-agent/chatbot";
import { readCodeState, writeCodeFiles } from "./utils";
import fs from "fs";
import path from "path";

dotenv.config();

const app = express();
const port = 2000;
const apiKey = process.env.OPENAI_API_KEY;

const cb = new Chatbot();
app.use(express.json()); // for parsing application/json

app.post("/chat", async (req, res) => {

  const userMessage = req.body.message;
  const code = req.body.code;

  // write client state to disk
  writeCodeFiles(code.html, code.css, code.js);

  try {
    const botReply = await cb.run(userMessage);
    res.json({ message: botReply.response });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error occurred while processing your message");
  }
});

app.get("/code", async (req, res) => {
  const data = readCodeState();
  res.json(data);
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
