import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  SystemMessagePromptTemplate
} from 'langchain/prompts'
import { StructuredOutputParser } from 'langchain/output_parsers'

export const parser = StructuredOutputParser.fromNamesAndDescriptions({
  html: 'modified html code',
  css: 'modified css code',
  js: 'modified js code'
})

// const messagePrompt = new PromptTemplate({
//   template:
//     'Modify the code based on the users requests, and the existing code state.',
//   inputVariables: ['input', 'html', 'css', 'js'],
//   partialVariables: { format_instructions: parser.getFormatInstructions() }
// })

// const humanChatMessage = new HumanMessagePromptTemplate(messagePrompt)

const promptBuilder = ChatPromptTemplate.fromPromptMessages([
  SystemMessagePromptTemplate.fromTemplate(
    `You are a UI design assistant which writes and edits html, css, and js code based on user requests.
      You are an expert at designing beautiful user interfaces and pay close attention to detail, while also
      carefully fulfilling user requests. Given user input, and the existing state of the code files, you will rewrite the code.`
  ),
  HumanMessagePromptTemplate.fromTemplate(
    `Modify the code based on the users requests, and the existing code state.
      user input: {input}
      html: {html}
      css: {css}
      js: {js}

      format output as follows

      html:
      code

      css:
      code

      js:
      code
      
      wrap all code in 3 backticks, do not include any non-code in backticks
      `
  )
])

promptBuilder.partialVariables = {
  format_instructions: parser.getFormatInstructions()
}
promptBuilder.outputParser = parser

export const uiChatPrompt = promptBuilder
