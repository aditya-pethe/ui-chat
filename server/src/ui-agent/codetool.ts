/*
Tool should do the following:
1 - Take the user prompt + current code state as input
2 - Generate the new code state, and write it to dist/ file
3 - Include some summary of the changes in the response
*/

import {
  DynamicStructuredTool,
  DynamicStructuredToolInput,
  DynamicTool,
  DynamicToolInput,
} from "langchain/tools";
import { z } from "zod";
import fs, { writeFileSync } from "fs";
import path from "path";
import { ConsoleCallbackHandler } from "langchain/dist/callbacks";

async function writeCode(input: string) {
  const html = "";
  const css = "";
  const js = "";

  const htmlPath = path.join(__dirname, "../codestate", "index.html");
  const cssPath = path.join(__dirname, "../codestate", "styles.css");
  const jsPath = path.join(__dirname, "../codestate", "script.js");

  fs.writeFileSync(htmlPath, html);
  fs.writeFileSync(cssPath, css);
  fs.writeFileSync(jsPath, js);

  return "Your changes are in! I made some modifications to the code, let me know if you have questions";
}

export const CodeWriterTool = new DynamicTool({
  name: "UI Code Generator",
  description: `Use this to write html, css, and js code to a user facing code-preview. Input should be a description
      of user requirements for the UI`,
  func: writeCode,
});
