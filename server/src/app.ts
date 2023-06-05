import express from 'express'
import dotenv from 'dotenv'
import { CodePreviewTool } from './ui-agent/tool'
import { writeCodeFiles } from './utils'
import path from 'path'

dotenv.config()

const app = express()
const port = process.env.PORT ?? 8080
// const apiKey = process.env.OPENAI_API_KEY
// Serve static files from the React app

const buildPath = '../../../build'

app.use(express.static(path.join(__dirname, buildPath)))

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, buildPath, '/index.html'))
})

const cb = new CodePreviewTool()
app.use(express.json()) // for parsing application/json

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/chat', async (req, res) => {
  const userMessage = req.body.message
  const code = req.body.code

  // write client state to disk
  writeCodeFiles(code.html, code.css, code.js)

  try {
    const botResponse = await cb._call(userMessage)
    res.json(botResponse)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error occurred while processing your message')
  }
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
