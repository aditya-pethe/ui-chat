import { useEffect, useState } from "react";
import "./chatbotui.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";

interface Message {
  sender: "user" | "bot";
  text: string;
}

interface ChatbotUIProps {
  fetchAndUpdateCode: () => void;
  htmlCode: string;
  cssCode: string;
  jsCode: string;
}

const Chatbot: React.FC<ChatbotUIProps> = ({
  fetchAndUpdateCode,
  htmlCode,
  cssCode,
  jsCode,
}) => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

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

      const response = await fetch("/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text, code: clientCode }),
      });

      const endTime = Date.now();

      const data = await response.json();
      console.log(data.message);

      const timeElapsed = (endTime - startTime) / 1000;
      const newMessage = `${data.message}. Time elapsed: ${timeElapsed} seconds`;

      // After the response from the server is received, add the bot's message
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: newMessage } as Message,
      ]);

      fetchAndUpdateCode();
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
        <textarea
          value={input}
          onChange={handleInputChange}
          className="input-field"
        />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
