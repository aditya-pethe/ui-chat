import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faKey, faCheck} from "@fortawesome/free-solid-svg-icons";
import {useState} from "react";

interface ApiKeyInputProps {
  apiKey: string;
  isApiKeyValid: boolean;
  setApiKey: React.Dispatch<React.SetStateAction<string>>;
  setIsApiKeyValid: React.Dispatch<React.SetStateAction<boolean>>;
}

const ApiKeyInput: React.FC<ApiKeyInputProps> = ({
  apiKey,
  isApiKeyValid,
  setApiKey,
  setIsApiKeyValid,
}) => {
  const [apiKeyInputActive, setApiKeyInputActive] = useState(false);

  const handleSaveApiKey = async () => {
    const response = await fetch('/key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ key: apiKey }),
    });

    if (!response.ok) {
      console.log("Api key error");
      alert('Please enter a valid api key');
    } else {
      setIsApiKeyValid(true);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
        e.preventDefault();
        if(apiKeyInputActive) {
          handleSaveApiKey();
        }
    }
  };

  const handleApiKeyChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsApiKeyValid(false);
    setApiKey(event.target.value);
  };

  return (
    <div className="message-input-area">
      <input
        type={"password"}
        value={apiKey}
        onChange={handleApiKeyChange}
        className="api-key-field"
        placeholder="Enter OpenAI API key"
        onKeyPress={handleKeyPress}
        onFocus={() => setApiKeyInputActive(true)}
        onBlur={() => setApiKeyInputActive(false)}
      />
      <button onClick={handleSaveApiKey}>
        <FontAwesomeIcon
          icon={isApiKeyValid ? faCheck : faKey}
          size="sm"
          className="save-button"
        />
      </button>
    </div>
  );
};

export default ApiKeyInput;
