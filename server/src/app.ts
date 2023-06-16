import express from 'express'
import dotenv from 'dotenv'
import { CodePreviewTool } from './ui-agent/tool'
import path from 'path'
import * as appInsights from 'applicationinsights'

dotenv.config()

// azure insights logging config
appInsights.setup(process.env.AZURE_INSTRUMENTATION_KEY).start()
const azClient = appInsights.defaultClient

// server init and config
const app = express()
const port = process.env.PORT ?? 8080
let apiKey = ''
// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
let cb = new CodePreviewTool(process.env.OPENAI_API_KEY!)

// Serve static files from the React app
const buildPath = '../../../build'
app.use(express.static(path.join(__dirname, buildPath)))

app.use(express.json())

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, buildPath, '/index.html'))
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/key', async (req, res) => {
  apiKey = req.body.key
  const headers = {
    Authorization: `Bearer ${apiKey}`
  }
  const url = 'https://api.openai.com/v1/models'
  const response = await fetch(url, { headers })

  if (response.status === 200) {
    cb = new CodePreviewTool(apiKey)
    res.status(200).send()
  } else {
    res.status(500).send('There was an error processing the api key')
  }
})

// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/chat', async (req, res) => {
  const userMessages = req.body.messages
  const code = req.body.code
  const startTime = Date.now()
  let botResponse = null

  try {
    botResponse = await cb._call(userMessages, code)
    res.json(botResponse)
  } catch (error) {
    console.error(error)
    if (error instanceof Error) {
      azClient.trackException({ exception: error })
    }
    res.status(500).send()
  }

  const endTime = Date.now()
  const timeElapsed = (endTime - startTime) / 1000

  azClient.trackTrace({
    message: 'Chat post request processed',
    properties: { // Custom properties
      userId: req.ip,
      userMessage: userMessages.pop(),
      responseTime: `${timeElapsed}`
    }
  })
})

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`)
})
