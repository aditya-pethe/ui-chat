import fs from 'fs'
import path from 'path'

export function readCodeState (): any {
  const htmlPath = path.join(__dirname, 'codestate', 'index.html')
  const cssPath = path.join(__dirname, 'codestate', 'styles.css')
  const jsPath = path.join(__dirname, 'codestate', 'script.js')

  const html = fs.readFileSync(htmlPath, 'utf-8')
  const css = fs.readFileSync(cssPath, 'utf-8')
  const js = fs.readFileSync(jsPath, 'utf-8')
  return { html, css, js }
}

export function writeCodeFiles (html: string, css: string, js: string): void {
  const htmlPath = path.join(__dirname, 'codestate', 'index.html')
  const cssPath = path.join(__dirname, 'codestate', 'styles.css')
  const jsPath = path.join(__dirname, 'codestate', 'script.js')

  fs.writeFileSync(htmlPath, html)
  fs.writeFileSync(cssPath, css)
  fs.writeFileSync(jsPath, js)
}

// const codePreviewTool = new CodePreviewTool();
// const res = codePreviewTool._call("make me a simple landing page for a personal website");
// console.log(res);
