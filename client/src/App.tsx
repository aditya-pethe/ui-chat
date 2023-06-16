import {useEffect, useState } from "react";
import Chatbot from "./components/chatbotui";
import { exampleHtml, exampleCss, exampleJs } from "./example-code/examples";
import Editor from "./components/editor";
import Tabs from "./components/tabs"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

import "./App.css"; // Importing the CSS file
import "./components/chatbotui.css";
import tabs from "./components/tabs";

function App() {
  const [htmlCode, setHtmlCode] = useState<string>(exampleHtml);
  const [cssCode, setCssCode] = useState<string>(exampleCss);
  const [jsCode, setJsCode] = useState<string>(exampleJs);
  const [activeTab, setActiveTab] = useState<"code" | "preview">("preview");
  const [srcDoc, setSrcDoc] = useState("");

  const fetchAndUpdateCode = async (html:string, css:string, js:string) => {
    // fetch code and update state
    setHtmlCode(html || "");
    setCssCode(css || "");
    setJsCode(js || "");
  };


  useEffect(() => {
    const wrappedJsCode = `
      document.addEventListener('DOMContentLoaded', (event) => {
          ${jsCode}
      });
    `;

    setSrcDoc(`
      <html>
        <head>
          <style>${cssCode}</style>
          <script>${wrappedJsCode}</script>
        </head>
        <body>${htmlCode}</body>
      </html>
    `);
  }, [htmlCode, cssCode, jsCode]);

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
        <Tabs activeTab={activeTab} setActiveTab={setActiveTab}></Tabs>

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
