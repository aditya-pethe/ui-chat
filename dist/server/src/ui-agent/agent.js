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
const openai_1 = require("langchain/chat_models/openai");
const schema_1 = require("langchain/schema");
const utils_1 = require("../utils");
const dotenv = __importStar(require("dotenv"));
dotenv.config();
const apiKey = process.env.OPENAI_API_KEY;
const cb = new openai_1.ChatOpenAI({ openAIApiKey: apiKey, temperature: 0 });
async function testChat(msg) {
    const response = cb.call([new schema_1.HumanChatMessage(msg)]);
    return response;
}
async function main() {
    const res = await testChat("can you give html and css for a simple landing page");
    console.log(res);
}
const code = (0, utils_1.readCodeState)();
console.log(code.html);
