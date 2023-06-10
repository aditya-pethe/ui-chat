import {
  Tool
} from 'langchain/tools'
import { ChatOpenAI } from 'langchain/chat_models/openai'
import { readCodeState } from '../utils'
import { uiChatPrompt } from './prompt'
import * as dotenv from 'dotenv'
// import { LLMChain } from 'langchain/chains'
// import { OutputFixingParser } from 'langchain/output_parsers'

dotenv.config()

export class CodePreviewTool extends Tool {
  name = 'CodePreviewTool'
  description = `This tool helps to preview a website based on user requests. Whenever a user asks you for code, call this tool.
   Input should be the user's exact request`

  protected apiKey: string
  private html: string
  private css: string
  private js: string
  private readonly chat: ChatOpenAI
  // private outputParser: OutputFixingParser<{ [x: string]: string; }>;

  constructor (key: string) {
    super()
    const code = readCodeState()
    this.html = code.html
    this.css = code.css
    this.js = code.js
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    this.apiKey = key
    this.chat = new ChatOpenAI({
      openAIApiKey: this.apiKey,
      temperature: 0,
      modelName: 'gpt-4'
    })

    // this.outputParser = OutputFixingParser.fromLLM(
    //   this.chat,
    //   parser
    // )
  }

  parseOutput (raw: string): any {
    const cleaned = raw.replace(/\s*(html:|css:|js:)\s*/, '\n')
    const result = cleaned.split('```')
    const extraChars = /\s*(html\n|css\n|js\n|\nhtml|\ncss|\njs)\s*/
    /*
    now result is -
    [\n,code,\n,code,\n,code]
     */
    const htmlCode = result[1]?.replace(extraChars, '')
      .trimStart()
      .replace(/^\s*:/, '')
    const cssCode = result[3]?.replace(extraChars, '')
      .trimStart()
      .replace(/^\s*:/, '')
    const jsCode = result[5]?.replace(extraChars, '')
      .trimStart()
      .replace(/^\s*:/, '')

    const obj = {
      html: htmlCode,
      css: cssCode,
      js: jsCode
    }

    console.log(obj)
    return obj
  }

  async _call (input: string): Promise<any> {
    /*
    1. generate html css and js code given user input
    2. Write html css and js code to a file
    */
    const code = readCodeState()
    this.html = code.html
    this.css = code.css
    this.js = code.js

    console.log(input)

    const res = this.chat.generatePrompt([
      await uiChatPrompt.formatPromptValue({
        input: input,
        html: this.html,
        css: this.css,
        js: this.js
      })
    ])

    const generation = (await res).generations[0][0].text
    // console.log(generation);
    const generatedCode = this.parseOutput(generation)
    // writeCodeFiles(generatedCode.html, generatedCode.css, generatedCode.js)
    const botResponse = 'I modified the code based on your requests!'
    const output = {
      html: generatedCode.html,
      css: generatedCode.css,
      js: generatedCode.js,
      message: botResponse
    }
    return output
  }
}
