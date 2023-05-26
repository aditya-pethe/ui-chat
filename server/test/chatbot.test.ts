import { Chatbot } from '../src/ui-agent/chatbot';

describe('Chatbot', () => {
  let chatbot: Chatbot;

  beforeEach(() => {
    chatbot = new Chatbot();
  });

  // Example test: Check that the run method works properly
  test('Run method returns a valid response', async () => {
    const response = await chatbot.run('Hello, world!');
    console.log(response);
    // Check that the response is a string (you might need a more specific check depending on your implementation)
    expect(typeof response.response).toBe('string');
  });


});
