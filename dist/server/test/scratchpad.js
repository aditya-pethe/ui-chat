"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// file for testing other modules in a not formalized / diagnositic way
const tool_1 = require("../src/ui-agent/tool");
// tool testing
const cp = new tool_1.CodePreviewTool();
const primaryPrompt = "Please write me a simple landing page for a personal website";
const secondaryPrompt = "Can you format it nicer? Use a better color palette and space things out better";
const jsPrompt = "Modify the javascript to have a simple animation on the page";
async function testCodePreview() {
    console.time("CodePreviewTool Execution Time"); // Start timer
    const res = await cp.call(primaryPrompt);
    // parseCode(res);
    console.timeEnd("CodePreviewTool Execution Time"); // End timer and print the duration
}
/*
Normal Execution: 1:27.420
No file I/O and parser: 43.983s
 */
testCodePreview();
const exampleOutput = `Modified code based on user request:

html:
<!DOCTYPE html>
<html>
  <head>
    <title>My Personal Website</title>
  </head>
  <body>
    <header>
      <h1>Welcome to my website!</h1>
    </header>
    <main>
      <section>
        <h2>About Me</h2>
        <p>Hi, I'm [Your Name] and I'm a [Your Profession].</p>
        <p>On this website, you can find information about me and my work.</p>
        <button>Learn More</button>
      </section>
    </main>
    <footer>
      <p>Contact me at: myemail@example.com</p>
      <p>Follow me on social media:</p>
      <ul>
        <li><a href="#">Twitter</a></li>
        <li><a href="#">Facebook</a></li>
        <li><a href="#">Instagram</a></li>
      </ul>
    </footer>
  </body>
</html>

css:
/* Reset default styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* Set background color */
body {
  background-color: #f2f2f2;
}

/* Style header */
header {
  background-color: #333;
  color: #fff;
  padding: 20px;
  text-align: center;
}

header h1 {
  font-size: 36px;
  margin-bottom: 10px;
}

/* Style main content */
main {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

main section {
  margin-bottom: 20px;
}

main h2 {
  font-size: 24px;
  margin-bottom: 10px;
}

main p {
  font-size: 18px;
  line-height: 1.5;
  margin-bottom: 20px;
}

main button {
  background-color: #333;
  color: #fff;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  cursor: pointer;
}

/* Style footer */
footer {
  background-color: #333;
  color: #fff;
  padding: 10px;
  text-align: center;
}

footer p {
  font-size: 14px;
  margin-bottom: 5px;
}

footer ul {
  list-style: none;
  margin-bottom: 0;
}

footer li {
  display: inline-block;
  margin-right: 10px;
}

footer li a {
  color: #fff;
  text-decoration: none;
}

js:
`;
function parseCode(raw) {
    let result = raw.split(/\s*(html:|css:|js:|HTML:|CSS:|JS:)\s*/);
    const intro = result[0];
    const htmlCode = result[2];
    const cssCode = result[4];
    const jsCode = result[6];
    const obj = {
        intro: intro,
        html: htmlCode,
        css: cssCode,
        js: jsCode
    };
    console.log(obj);
}
