// scripts/removeHtmlLinks.js
import fs from "fs";
import path from "path";

const targetDir = "./"; // Root-Verzeichnis deines Projekts

function processFile(filePath) {
  if (!filePath.endsWith(".html")) return;

  let content = fs.readFileSync(filePath, "utf-8");

  // Entferne .html aus internen Links z. B. href="about.html"
  content = content.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    // Ignoriere externe Links oder Anker
    if (p1.startsWith("http") || p1.startsWith("#")) return match;
    return `href="${p1}"`;
  });

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Updated ${filePath}`);
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else {
      processFile(fullPath);
    }
  });
}

walkDir(targetDir);
