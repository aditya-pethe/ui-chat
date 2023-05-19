import React, { useState, useCallback } from 'react';
import CodeMirror from '@uiw/react-codemirror';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';
import { javascript } from '@codemirror/lang-javascript';
import { ViewUpdate } from '@codemirror/view';
import Chatbot from './components/chatbotui'
import './App.css'; // Importing the CSS file
import './components/chatbotui.css'

function CodeEditor() {
  const [htmlCode, setHtmlCode] = useState<string>('');
  const [cssCode, setCssCode] = useState<string>('');
  const [jsCode, setJsCode] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'code' | 'preview'>('code');

  const htmlOnChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setHtmlCode(value);
  }, []);

  const cssOnChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setCssCode(value);
  }, []);

  const jsOnChange = useCallback((value: string, viewUpdate: ViewUpdate) => {
    setJsCode(value);
  }, []);

  const srcDoc = `
    <html>
      <body>${htmlCode}</body>
      <style>${cssCode}</style>
      <script>${jsCode}</script>
    </html>
  `;

  return (
    <div className="app-container">
      <div className="placeholder">
        <div className="chatbot-container">
            <Chatbot/>
        </div>
      </div>
      
      <div className="code-preview-container">
        <div className="tabs">
          <button 
            className={activeTab === 'code' ? 'active' : ''}
            onClick={() => setActiveTab('code')}>
              Code
          </button>
          <button 
            className={activeTab === 'preview' ? 'active' : ''}
            onClick={() => setActiveTab('preview')}>
              Preview
          </button>
        </div>

        {activeTab === 'code' && (
          <div className="code-editors">
            <div className="html-editor">
              <label>HTML</label>
              <CodeMirror
                value={htmlCode}
                extensions={[html()]}
                onChange={htmlOnChange}
              />
            </div>
            <div className="css-editor">
              <label>CSS</label>
              <CodeMirror
                value={cssCode}
                extensions={[css()]}
                onChange={cssOnChange}
              />
            </div>
            <div className="js-editor">
              <label>JavaScript</label>
              <CodeMirror
                value={jsCode}
                extensions={[javascript({ jsx: true })]}
                onChange={jsOnChange}
              />
            </div>
          </div>
        )}

        {activeTab === 'preview' && (
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

export default CodeEditor;
