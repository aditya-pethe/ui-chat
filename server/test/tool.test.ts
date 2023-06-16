import { CodePreviewTool } from '../src/ui-agent/tool'
import { writeCodeFiles, readCodeState } from '../src/utils'
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
const apiKey = process.env.OPENAI_API_KEY!

describe('CodePreview', () => {
  let codePreviewTool: CodePreviewTool

  beforeEach(() => {
    codePreviewTool = new CodePreviewTool(apiKey)
  })

  afterEach(() => {
    writeCodeFiles('', '', '')
  })

  // Check that the call method return string
  test('Call method returns a valid response', async () => {
    const oldCode = readCodeState()
    const response = await codePreviewTool._call(
      ['Make a personal website with a light theme', 'now add a dark mode slider'],
      oldCode
    )
    // const newCode = readCodeState()

    expect(typeof response.message).toBe('string')
    expect(typeof response.html).toBe('string')
    expect(typeof response.css).toBe('string')
    expect(typeof response.js).toBe('string')

    // expect(oldCode).not.toEqual(newCode);
  }, 120000)
})
