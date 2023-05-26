import {
  Tool,
  DynamicStructuredTool,
  DynamicStructuredToolInput,
  DynamicTool,
  DynamicToolInput,
} from "langchain/tools";
import { z } from "zod";
import fs, { writeFileSync } from "fs";
import path from "path";
import { ConsoleCallbackHandler } from "langchain/dist/callbacks";
import { readCodeState, writeCodeFiles } from "../utils";

export class MathTool extends Tool {
  name = "Square root tool";
  description = "This tool helps find the square root of a number";
}

export class CodePreviewTool extends Tool {
  name = "CodePreviewTool";
  description = "This tool helps to preview the code";

  private html: string;
  private css: string;
  private js: string;

  constructor() {
    super();
    const code = readCodeState();
    this.html = code.html;
    this.css = code.css;
    this.js = code.js;
  }

  async _call(arg: string): Promise<string> {
    try {
      // Perform your specific tool operations here. For example:
      const result = "Performing Code Preview operation on: " + arg;
      return Promise.resolve(result);
    } catch (error) {
      // If an error occurs, return a string that represents the error.
      return Promise.resolve("An error occurred in CodePreviewTool: " + error);
    }
  }
}
