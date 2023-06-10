import { useEffect, useState } from "react";
import "./chatbotui.css";
import TextInput from "./textinput"
// import ApiKeyInput from "./apikeyinput"

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotUIProps {
  fetchAndUpdateCode: (html:string,css:string,js:string) => void;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

const startMessage: Message = {
  sender:"bot",
  text:`Welcome to UI-chat! To get started, describe a website you'd like to build, and I'll modify the code accordingly.
  
  Try "create a personal website with a dark mode button", or "create an imitation site of google". I'll try and be quick, but response times can take up to 2 minutes. Have fun!`
}

const Chatbot: React.FC<ChatbotUIProps> = ({
  fetchAndUpdateCode,
  htmlCode,
  cssCode,
  jsCode,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([startMessage]);  
  const [isLoading, setIsLoading] = useState(false);
  // const [isApiKeyValid, setIsApiKeyValid] = useState(true);
  // const [apiKey, setApiKey] = useState("");


  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(event.target.value);
  };

  const handleSendMessage = async () => {
    if (input.trim() !== "") {
      const userMessage: Message = { sender: "user", text: input.trim() }; // Add : Message here
      setMessages([...messages, userMessage]);
      setInput("");
      setIsLoading(true);

      const clientCode = { html: htmlCode, css: cssCode, js: jsCode };
      const startTime = Date.now();

      // get server response
      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text, code: clientCode}),
      });

      if(response.status!==200){
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: "bot", text: "I'm sorry, there was an error processing your request" } as Message,
        ]);
        setIsLoading(false);
        return;
      }

      const endTime = Date.now();

      const data = await response.json();
      console.log(data.message);

      const timeElapsed = (endTime - startTime) / 1000;
      const newMessage = `${data.message} Time elapsed: ${timeElapsed} seconds`;

      // After the response from the server is received, add the bot's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: newMessage } as Message,
      ]);

      fetchAndUpdateCode(data.html, data.css, data.js);
      setIsLoading(false);
    }
  };

  // You no longer need to add the bot's message in this useEffect hook
  useEffect(() => {}, [messages]);

  return (
    <div className="chatbot-container">
      {messages.map((message, index) => (
        <div
          key={index}
          className={message.sender === "user" ? "userMessage" : "botMessage"}
        >
          {message.text}
        </div>
      ))}
      {isLoading && <div className="loading"></div>}
      <div className="input-area">
      <TextInput
        input={input}
        handleInputChange={handleInputChange}
        handleSendMessage={handleSendMessage}
        isApiKeyValid={true}
      />
      {/* <ApiKeyInput
        apiKey={apiKey}
        isApiKeyValid={isApiKeyValid}
        setApiKey={setApiKey}
        setIsApiKeyValid={setIsApiKeyValid}
      /> */}
      </div>
    </div>
  );
};

export default Chatbot;
