"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.writeCodeFiles = exports.readCodeState = void 0;
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
function readCodeState() {
    const htmlPath = path_1.default.join(__dirname, 'codestate', 'index.html');
    const cssPath = path_1.default.join(__dirname, 'codestate', 'styles.css');
    const jsPath = path_1.default.join(__dirname, 'codestate', 'script.js');
    const html = fs_1.default.readFileSync(htmlPath, 'utf-8');
    const css = fs_1.default.readFileSync(cssPath, 'utf-8');
    const js = fs_1.default.readFileSync(jsPath, 'utf-8');
    return { html, css, js };
}
exports.readCodeState = readCodeState;
function writeCodeFiles(html, css, js) {
    const htmlPath = path_1.default.join(__dirname, 'codestate', 'index.html');
    const cssPath = path_1.default.join(__dirname, 'codestate', 'styles.css');
    const jsPath = path_1.default.join(__dirname, 'codestate', 'script.js');
    fs_1.default.writeFileSync(htmlPath, html);
    fs_1.default.writeFileSync(cssPath, css);
    fs_1.default.writeFileSync(jsPath, js);
}
exports.writeCodeFiles = writeCodeFiles;
// const codePreviewTool = new CodePreviewTool();
// const res = codePreviewTool._call("make me a simple landing page for a personal website");
// console.log(res);
