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
        <h1 class="header">Talk to me to design your website</h1>
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
    background-color: lavender;
    font-family: Arial, sans-serif;
}

.container {
    text-align: center;
}

.header {
    color: #333;
    font-size: 2em;
}
`;

const exampleJs = `
// This is a simple page, so no JavaScript is needed at the moment. 
// But you can add interactivity here if needed in the future.
`;

export { exampleHtml, exampleCss, exampleJs };
