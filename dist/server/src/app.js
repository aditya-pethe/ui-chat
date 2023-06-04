"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const tool_1 = require("./ui-agent/tool");
const utils_1 = require("./utils");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 8080;
// const apiKey = process.env.OPENAI_API_KEY
// Serve static files from the React app
const buildPath = "../../../client/build";
app.use(express_1.default.static(path_1.default.join(__dirname, buildPath)));
app.get('*', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, buildPath, '/index.html'));
});
const cb = new tool_1.CodePreviewTool();
app.use(express_1.default.json()); // for parsing application/json
// eslint-disable-next-line @typescript-eslint/no-misused-promises
app.post('/chat', async (req, res) => {
    const userMessage = req.body.message;
    const code = req.body.code;
    // write client state to disk
    (0, utils_1.writeCodeFiles)(code.html, code.css, code.js);
    try {
        const botResponse = await cb._call(userMessage);
        res.json(botResponse);
    }
    catch (error) {
        console.error(error);
        res.status(500).send('Error occurred while processing your message');
    }
});
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
