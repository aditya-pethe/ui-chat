// chatbot.ts
import { ConversationChain } from 'langchain/chains'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import {
  AgentExecutor,
  initializeAgentExecutorWithOptions
} from 'langchain/agents'
import { BufferMemory } from 'langchain/memory'
import { Tool } from 'langchain/tools'
import { CodePreviewTool } from './tool'
import * as dotenv from 'dotenv'

dotenv.config()

export class Chatbot {
  private agent!: AgentExecutor
  private readonly chat: ChatOpenAI
  private readonly chain: ConversationChain
  private readonly memory: BufferMemory
  private readonly tools: Tool[]
  protected apiKey: string

  constructor () {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.apiKey = process.env.OPENAI_API_KEY!
    this.chat = new ChatOpenAI({ openAIApiKey: this.apiKey, temperature: 0 })
    this.memory = new BufferMemory()
    this.chain = new ConversationChain({
      memory: this.memory,
      llm: this.chat
    })
    this.tools = [new CodePreviewTool()]
    void this.initAgent()
  }

  async initAgent (): Promise<void> {
    this.agent = await initializeAgentExecutorWithOptions(
      this.tools,
      this.chat,
      {
        agentType: 'chat-conversational-react-description',
        verbose: true
      }
    )
  }

  async run (userMessage: string): Promise<any> {
    const response = await this.agent.call({
      input: userMessage
    })

    return response
  }
}
