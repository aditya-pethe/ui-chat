"use strict";
/*
Tool should do the following:
1 - Take the user prompt + current code state as input
2 - Generate the new code state, and write it to dist/ file
3 - Include some summary of the changes in the response
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CodeWriterTool = void 0;
const tools_1 = require("langchain/tools");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
async function writeCode(input) {
    const html = "";
    const css = "";
    const js = "";
    const htmlPath = path_1.default.join(__dirname, "../codestate", "index.html");
    const cssPath = path_1.default.join(__dirname, "../codestate", "styles.css");
    const jsPath = path_1.default.join(__dirname, "../codestate", "script.js");
    fs_1.default.writeFileSync(htmlPath, html);
    fs_1.default.writeFileSync(cssPath, css);
    fs_1.default.writeFileSync(jsPath, js);
    return "Your changes are in! I made some modifications to the code, let me know if you have questions";
}
exports.CodeWriterTool = new tools_1.DynamicTool({
    name: "UI Code Generator",
    description: `Use this to write html, css, and js code to a user facing code-preview. Input should be a description
      of user requirements for the UI`,
    func: writeCode,
});
