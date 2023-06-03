import { Chatbot } from '../src/ui-agent/chatbot'

describe('Chatbot', () => {
  let chatbot: Chatbot

  beforeEach(() => {
    chatbot = new Chatbot()
  })

  // Example test: Check that the run method works properly
  test('Run method returns a valid response', async () => {
    const response = await chatbot.run('Hello, world!')
    expect(typeof response.output).toBe('string')
  })

  // Example test: Check that the agent runs with a tool
  test('Check code tool usage', async () => {
    const primaryPrompt =
      'Please write me a simple landing page for a personal website'
    // const secondaryPrompt =
    //   'Can you format it nicer? Use a better color palette and space things out better'
    // const jsPrompt =
    //   'Modify the javascript to have a simple animation on the page'

    const response = await chatbot.run(primaryPrompt)
    expect(typeof response.output).toBe('string')
  }, 120000)
})
