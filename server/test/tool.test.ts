import { CodePreviewTool } from "../src/ui-agent/tool";
import { readCodeState, writeCodeFiles } from "../src/utils";

describe("CodePreview", () => {
  let codePreviewTool: CodePreviewTool;

  beforeEach(() => {
    codePreviewTool = new CodePreviewTool();
  });

  afterEach(() => {
    writeCodeFiles("", "", "");
  });

  //Check that the call method return string
  test("Call method returns a valid response", async () => {
    const oldCode = readCodeState();
    const response = await codePreviewTool.call(
      "please write a simple landing page for a personal website"
    );
    const newCode = readCodeState();

    expect(typeof response).toBe("string");
    // expect(oldCode).not.toEqual(newCode);
  }, 120000);
});
