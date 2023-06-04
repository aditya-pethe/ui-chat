"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodePreviewTool = void 0;
const tools_1 = require("langchain/tools");
const openai_1 = require("langchain/chat_models/openai");
const utils_1 = require("../utils");
const prompt_1 = require("./prompt");
const dotenv = __importStar(require("dotenv"));
// import { LLMChain } from 'langchain/chains'
// import { OutputFixingParser } from 'langchain/output_parsers'
dotenv.config();
class CodePreviewTool extends tools_1.Tool {
    // private outputParser: OutputFixingParser<{ [x: string]: string; }>;
    constructor() {
        super();
        this.name = 'CodePreviewTool';
        this.description = `This tool helps to preview a website based on user requests. Whenever a user asks you for code, call this tool.
   Input should be the user's exact request`;
        const code = (0, utils_1.readCodeState)();
        this.html = code.html;
        this.css = code.css;
        this.js = code.js;
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        this.apiKey = process.env.OPENAI_API_KEY;
        this.chat = new openai_1.ChatOpenAI({
            openAIApiKey: this.apiKey,
            temperature: 0,
            modelName: 'gpt-4'
        });
        // this.outputParser = OutputFixingParser.fromLLM(
        //   this.chat,
        //   parser
        // )
    }
    parseOutput(raw) {
        const cleaned = raw.replace(/\s*(html:|css:|js:)\s*/, '\n');
        const result = cleaned.split('```');
        const extraChars = /\s*(html\n|css\n|js\n|\nhtml|\ncss|\njs)\s*/;
        /*
        now result is -
        [\n,code,\n,code,\n,code]
         */
        const htmlCode = result[1]
            .replace(extraChars, '')
            .trimStart()
            .replace(/^\s*:/, '');
        const cssCode = result[3]
            .replace(extraChars, '')
            .trimStart()
            .replace(/^\s*:/, '');
        const jsCode = result[5]
            .replace(extraChars, '')
            .trimStart()
            .replace(/^\s*:/, '');
        const obj = {
            html: htmlCode,
            css: cssCode,
            js: jsCode
        };
        console.log(obj);
        return obj;
    }
    async _call(input) {
        /*
        1. generate html css and js code given user input
        2. Write html css and js code to a file
        */
        const code = (0, utils_1.readCodeState)();
        this.html = code.html;
        this.css = code.css;
        this.js = code.js;
        console.log(input);
        const res = this.chat.generatePrompt([
            await prompt_1.uiChatPrompt.formatPromptValue({
                input: input,
                html: this.html,
                css: this.css,
                js: this.js
            })
        ]);
        const generation = (await res).generations[0][0].text;
        // console.log(generation);
        const generatedCode = this.parseOutput(generation);
        // writeCodeFiles(generatedCode.html, generatedCode.css, generatedCode.js)
        const botResponse = 'I modified the code based on your requests - let me know if you have questions!';
        const output = {
            html: generatedCode.html,
            css: generatedCode.css,
            js: generatedCode.js,
            message: botResponse
        };
        return output;
    }
}
exports.CodePreviewTool = CodePreviewTool;
