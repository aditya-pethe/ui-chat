// chatbot.ts
import { ConversationChain } from "langchain/chains";
import { OpenAI } from "langchain/llms/openai";
import { ChatOpenAI } from "langchain/chat_models/openai";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate,
  MessagesPlaceholder,
} from "langchain/prompts";
import {
  AgentExecutor,
  initializeAgentExecutorWithOptions,
} from "langchain/agents";
import { BufferMemory } from "langchain/memory";
import { Tool, DynamicTool } from "langchain/tools";
import { CodeWriterTool } from "./codetool";
import * as dotenv from "dotenv";

dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;

export class Chatbot {
  private agent!: AgentExecutor;
  private chat: ChatOpenAI;
  private chain: ConversationChain;
  private memory: BufferMemory;
  private tools: Array<DynamicTool>;

  constructor() {
    this.chat = new ChatOpenAI({ openAIApiKey: apiKey, temperature: 0 });
    this.memory = new BufferMemory();
    this.chain = new ConversationChain({
      memory: this.memory,
      llm: this.chat,
    });
    this.tools = [];
    this.initAgent();
  }

  async initAgent() {
    this.agent = await initializeAgentExecutorWithOptions(
      this.tools,
      this.chat,
      {
        agentType: "chat-conversational-react-description",
        verbose: true,
      }
    );
  }

  async run(userMessage: string) {
    const response = await this.chain.call({
      input: userMessage,
    });

    return response;
  }
}
