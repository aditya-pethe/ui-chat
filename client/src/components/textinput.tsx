import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

interface TextInputProps {
    input: string;
    handleInputChange: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
    handleSendMessage: () => void;
    isApiKeyValid: boolean;
  }
  
  const TextInput: React.FC<TextInputProps> = ({ input, handleInputChange, handleSendMessage, isApiKeyValid }) => {
    const [textInputActive, setTextInputActive] = useState(false);
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === 'Enter') {
          e.preventDefault();
          if(textInputActive) {
              handleSendMessage();
          }
      }
    };
  
    return (
      <div className="message-input-area">
        <textarea
          value={input}
          onChange={handleInputChange}
          className="input-field"
          disabled={!isApiKeyValid}
          placeholder="Enter your instruction here, i.e 'Make me a personal website'"
          onKeyPress={handleKeyPress}
          onFocus={() => setTextInputActive(true)}
          onBlur={() => setTextInputActive(false)}
        />
        <button onClick={handleSendMessage}>
          <FontAwesomeIcon icon={faPaperPlane} size="lg" />
        </button>
      </div >
    );
  };
  
  export default TextInput;
  