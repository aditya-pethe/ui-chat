

# ui-chat

[![try_it_out](https://img.shields.io/badge/try_it_out-teal.svg)](https://uichat.azurewebsites.net/)
[![langchain.js](https://img.shields.io/badge/langchain.js-navy.svg)]([https://uichat.azurewebsites.net/](https://js.langchain.com/docs/))


UI-Chat is a chatbot that generates user interface code based on conversational inputs. This means you can simply describe the interface you want, and the chatbot will generate the corresponding HTML, CSS, and JavaScript code. The key features include:

- **Interactive Chatbot**: Describe the UI component you want, and the chatbot will generate the corresponding code.
- **Code Preview**: Instantly preview the code generated by the chatbot. The code can be modified manually as well.

## Usage Tips

- The more specific you can be while prompting, the closer you will get to desired outputs
- Sometimes generations might output incorrectly, and not be parsed properly as a result - check the code if it looks way off
- One fun prompt idea is "imitation" websites - i.e "Create an imitation website of Google" and so on. 
- Right now this is a fun tool for idea generation, and not best for writing usable / extensible code

## How it works

Under the hood, UI-chat uses gpt-4 to generate code based on user requests, and previews it in the browser. Basically, uichat takes in the client code state + user request, generates modified code. It does this using langchain, an open source library for building applications with large language models.  

Ui-chat is build with react.js, node.js, langchain.js for the LLM actions, and hosted on Azure. 


## Todo Features

- copy-paste on iframes
- open ai key functionality
- experiment with writing diffs instead of code
- better conversational memory
- accounts / save states for users
