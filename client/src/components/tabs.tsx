import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import "./tabs.css"

interface tabsInputProps {
    activeTab:string,
    setActiveTab: React.Dispatch<React.SetStateAction<"code" | "preview">>;
}

const tabs: React.FC<tabsInputProps> = ({
    activeTab,
    setActiveTab
}) => {  
    
    return (
        <div className="tabs">
          <button
            className={activeTab === "code" ? "active" : ""}
            onClick={() => setActiveTab("code")}
          >
            Code
          </button>
          <button
            className={activeTab === "preview" ? "active" : ""}
            onClick={() => setActiveTab("preview")}
          >
            Preview
          </button>
          
          <a href="https://github.com/aditya-pethe/ui-chat" target="_blank" rel="noopener noreferrer">
            <FontAwesomeIcon className="tab-icon" icon={faGithub} size='lg' />
          </a>

        </div>
    );
  };
  
  export default tabs;
  