import React, { useEffect, useState } from "react";
import Chatbot from "./components/chatbotui";
import { exampleHtml, exampleCss, exampleJs } from "./example-code/examples";
import Editor from "./components/editor";

import "./App.css"; // Importing the CSS file
import "./components/chatbotui.css";

function App() {
  const [htmlCode, setHtmlCode] = useState<string>(exampleHtml);
  const [cssCode, setCssCode] = useState<string>(exampleCss);
  const [jsCode, setJsCode] = useState<string>(exampleJs);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("code");

  const fetchCode = async () => {
    try {
      const response = await fetch(`/code`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Failed to fetch code:`, error);
    }
  };

  const fetchAndUpdateCode = async () => {
    // fetch code and update state
    const { html, css, js } = await fetchCode();
    setHtmlCode(html || "");
    setCssCode(css || "");
    setJsCode(js || "");
  };

  const wrappedJsCode = `
  document.addEventListener('DOMContentLoaded', (event) => {
      ${jsCode}
  });
  `;

  const srcDoc = `
  <html>
    <head>
      <style>${cssCode}</style>
      <script>${wrappedJsCode}</script>
    </head>
    <body>${htmlCode}</body>
  </html>
  `;

  
  return (
    <div className="app-container">
      <div className="placeholder">
        <div className="chatbot-container">
          <Chatbot
            htmlCode={htmlCode}
            cssCode={cssCode}
            jsCode={jsCode}
            fetchAndUpdateCode={fetchAndUpdateCode}
          />
        </div>
      </div>

      <div className="code-preview-container">
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
        </div>

        {activeTab === "code" && (
          <div className="code-editors">
            <Editor language="html" code={htmlCode} setCode={setHtmlCode} />
            <Editor language="css" code={cssCode} setCode={setCssCode} />
            <Editor language="js" code={jsCode} setCode={setJsCode} />
          </div>
        )}

        {activeTab === "preview" && (
          <iframe
            srcDoc={srcDoc}
            title="output"
            sandbox="allow-scripts"
            frameBorder="0"
            width="100%"
            height="100%"
          />
        )}
      </div>
    </div>
  );
}

export const codeObject = {};
export default App;
