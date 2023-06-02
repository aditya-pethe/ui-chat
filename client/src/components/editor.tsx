import React from "react";
import { aura } from "@uiw/codemirror-theme-aura";
import { html } from "@codemirror/lang-html";
import { css } from "@codemirror/lang-css";
import { javascript } from "@codemirror/lang-javascript";
import CodeMirror from "@uiw/react-codemirror";
import "./editor.css";

interface EditorProps {
  language: "html" | "css" | "js";
  code: string;
  setCode: (code: string) => void;
}

const Editor: React.FC<EditorProps> = ({ language, code, setCode }) => {
  let languageExtension;
  let label;
  switch (language) {
    case "html":
      languageExtension = html();
      label = <div>HTML</div>;
      break;
    case "css":
      languageExtension = css();
      label = <div>CSS</div>;
      break;
    case "js":
      languageExtension = javascript();
      label = <div>JavaScript</div>;
      break;
  }

  return (
    <div className="editor">
      {label}
      <CodeMirror
        theme={aura}
        height="1000px"
        value={code}
        extensions={[languageExtension]}
        onChange={(value) => setCode(value)}
      />
    </div>
  );
};

export default Editor;
