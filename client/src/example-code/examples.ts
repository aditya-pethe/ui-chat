const exampleHtml = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Demo Page</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <div class="container">
        <h1 class="header">Hi! Talk to me to design your website</h1>
    </div>
    <script src="script.js"></script>
</body>
</html>
`;

const exampleCss = `
body {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    margin: 0;
    background-color: black;
    font-family: Arial, sans-serif;
}

.container {
    text-align: center;
}

.header {
    /* existing styles */
    color: teal;
    font-size: 3em;
    font-weight: bold;

    /* new styles for typing effect */
    white-space: pre; /* preserve spaces and line breaks */
    overflow: hidden; /* hide the text until it's typed */
    border-right: .15em solid orange; /* cursor */
    animation: typing 4s steps(30, end), blink-caret .75s step-end infinite;
}

@keyframes typing {
    from { width: 0; }
    to { width: 100%; }
}

@keyframes blink-caret {
    from, to { border-color: transparent; }
    50% { border-color: orange; }
}
`;

const exampleJs = `
// This is a simple page, so no JavaScript is needed at the moment. 
// But you can add interactivity here if needed in the future.
`;

export { exampleHtml, exampleCss, exampleJs };
