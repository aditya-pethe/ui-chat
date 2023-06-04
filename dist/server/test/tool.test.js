"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tool_1 = require("../src/ui-agent/tool");
const utils_1 = require("../src/utils");
describe('CodePreview', () => {
    let codePreviewTool;
    beforeEach(() => {
        codePreviewTool = new tool_1.CodePreviewTool();
    });
    afterEach(() => {
        (0, utils_1.writeCodeFiles)('', '', '');
    });
    // Check that the call method return string
    test('Call method returns a valid response', async () => {
        // const oldCode = readCodeState()
        const response = await codePreviewTool._call('please write a simple landing page for a personal website');
        // const newCode = readCodeState()
        expect(typeof response.message).toBe('string');
        expect(typeof response.html).toBe('string');
        expect(typeof response.css).toBe('string');
        expect(typeof response.js).toBe('string');
        // expect(oldCode).not.toEqual(newCode);
    }, 120000);
});
