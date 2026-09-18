#!/usr/bin/env node
// Renders README.md into a standalone HTML preview so the GitHub profile
// page can be inspected locally before pushing changes.
const fs = require("fs");
const path = require("path");
const { marked } = require("marked");

const root = path.resolve(__dirname, "..");
const source = path.join(root, "README.md");
const outDir = path.join(root, "preview");
const outFile = path.join(outDir, "index.html");

const markdown = fs.readFileSync(source, "utf8");
const body = marked.parse(markdown);

const html = `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8" />
<meta name="viewport" content="width=device-width, initial-scale=1" />
<title>README preview</title>
<style>
  body { margin: 0; background: #0d1117; color: #e6edf3;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif; }
  .container { max-width: 860px; margin: 40px auto; padding: 32px;
    background: #0d1117; border: 1px solid #30363d; border-radius: 12px; }
  a { color: #2f81f7; }
  h1, h2, h3 { border-bottom: 1px solid #21262d; padding-bottom: .3em; }
  img { vertical-align: middle; }
</style>
</head>
<body>
  <div class="container">
${body}
  </div>
</body>
</html>
`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, html);
console.log(`Rendered ${source} -> ${outFile} (${body.length} bytes of HTML)`);
