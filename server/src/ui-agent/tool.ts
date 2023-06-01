import {
  Tool,
  DynamicStructuredTool,
  DynamicStructuredToolInput,
  DynamicTool,
  DynamicToolInput,
} from "langchain/tools";
import { ChatOpenAI } from "langchain/chat_models/openai";
import { readCodeState, writeCodeFiles } from "../utils";
import { uiChatPrompt, parser } from "./prompt";
import * as dotenv from "dotenv";
import { LLMChain } from "langchain/chains";
import {OutputFixingParser } from "langchain/output_parsers";

dotenv.config();

// export class MathTool extends Tool {
//   name = "Square root tool";
//   description = "This tool helps find the square root of a number";
//   constructor() {
//     super();
//   }
//   async _call(num: number): Promise<string> {
//     let sqrt: number = Math.sqrt(num);
//     return `${sqrt}`;
//   }
// }

export class CodePreviewTool extends Tool {
  name = "CodePreviewTool";
  description = `This tool helps to preview a website based on user requests. Whenever a user asks you for code, call this tool.
   Input should be the user's exact request`;

  protected apiKey: string;
  private html: string;
  private css: string;
  private js: string;
  private chat: ChatOpenAI;
  // private outputParser: OutputFixingParser<{ [x: string]: string; }>;

  constructor() {
    super();
    const code = readCodeState();
    this.html = code.html;
    this.css = code.css;
    this.js = code.js;
    this.apiKey = process.env.OPENAI_API_KEY!
    this.chat = new ChatOpenAI({ openAIApiKey: this.apiKey, temperature: 0});

    // this.outputParser = OutputFixingParser.fromLLM(
    //   this.chat,
    //   parser
    // )
  }

  parseOutput(raw:string){
    
    let cleaned = raw.replace(/\s*(html:|css:|js:)\s*/,"\n");
    let result = cleaned.split("```");
    let extra_chars = /\s*(html\n|css\n|js\n)\s*/;
    /*
    now result is - 
    [\n,code,\n,code,\n,code]
     */
    const htmlCode = result[1].replace(extra_chars,"").trimStart()
    const cssCode = result[3].replace(extra_chars,"").trimStart()
    const jsCode = result[5].replace(extra_chars,"").trimStart()

      const obj = {
        html:htmlCode,
        css:cssCode,
        js:jsCode
    }

    console.log(obj)
    return obj;

  }

  async _call(input: string): Promise<string> {
    /*
    1. generate html css and js code given user input
    2. Write html css and js code to a file
    */
    const code = readCodeState();
    this.html = code.html;
    this.css = code.css;
    this.js = code.js;

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
    const generatedCode = this.parseOutput(generation);
    writeCodeFiles(generatedCode.html, generatedCode.css, generatedCode.js);

    return "I modified the code based on your requests - let me know if you have questions!";
  }
}


