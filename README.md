# ui-chat
An natural language interface for frontend development

## Agent Logic

At the core of this project is a conversational agent capable of making changes
to the UI by conversing with the user - this can be broken down into a few steps.

- Getting user input / storing the conversation in buffer memory
- Creating a conversational agent with langchain, which has access to buffer memory and a toolkit
- Defining a custom toolkit in langchain for writing code previews

## Tool Design

- There are two forms of relevant user input: 1) User conversation, and 2) Code state.
- The chat agent will summarize user requests to the input tool. 