"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// file for testing other modules in a not formalized / diagnositic way
const tool_1 = require("./ui-agent/tool");
// tool testing
const cp = new tool_1.CodePreviewTool();
const primaryPrompt = 'Please write me a simple landing page for a personal website';
// const secondaryPrompt =
//   'Can you format it nicer? Use a better color palette and space things out better'
// const jsPrompt = 'Modify the javascript to have a simple animation on the page'
async function testCodePreview() {
    console.time('CodePreviewTool Execution Time'); // Start timer
    const res = await cp.call(primaryPrompt);
    console.log(res);
    console.timeEnd('CodePreviewTool Execution Time'); // End timer and print the duration
}
/*
Normal Execution: 1:27.420
No file I/O and parser: 43.983s
 */
void testCodePreview();
