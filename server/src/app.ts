import express from 'express'
import dotenv from 'dotenv'
import { CodePreviewTool } from './ui-agent/tool'
import { readCodeState, writeCodeFiles } from './utils'

dotenv.config()

const app = express()
const port = 2000
// const apiKey = process.env.OPENAI_API_KEY

const cb = new CodePreviewTool()
app.use(express.json()) // for parsing application/json

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message
  const code = req.body.code

  // write client state to disk
  writeCodeFiles(code.html, code.css, code.js)

  try {
    const botReply = await cb._call(userMessage)
    res.json({ message: botReply })
  } catch (error) {
    console.error(error)
    res.status(500).send('Error occurred while processing your message')
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.get('/code', async (req, res) => {
  const data = readCodeState()
  res.json(data)
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
