import fs from "fs";
import path from "path";

const targetDir = "./"; // Root-Verzeichnis

function processHtmlFile(filePath) {
  if (!filePath.endsWith(".html")) return;

  let content = fs.readFileSync(filePath, "utf-8");

  // Ersetze href="xyz.html" → href="xyz"
  content = content.replace(/href="([^"]+)\.html"/g, (match, p1) => {
    if (p1.startsWith("http") || p1.startsWith("#")) return match;
    return `href="${p1}"`;
  });

  fs.writeFileSync(filePath, content, "utf-8");
  console.log(`✅ Updated HTML: ${filePath}`);
}

function processJsonFile(filePath) {
  if (!filePath.endsWith(".json")) return;

  let content = fs.readFileSync(filePath, "utf-8");
  let updated = false;

  try {
    const json = JSON.parse(content);

    // Durchläuft rekursiv das Objekt und entfernt .html bei jedem "link"
    function cleanLinks(obj) {
      for (const key in obj) {
        const val = obj[key];
        if (typeof val === "object" && val !== null) {
          cleanLinks(val);
        } else if (
          key === "link" &&
          typeof val === "string" &&
          val.endsWith(".html")
        ) {
          obj[key] = val.replace(/\.html$/, "");
          updated = true;
        }
      }
    }

    cleanLinks(json);

    if (updated) {
      fs.writeFileSync(filePath, JSON.stringify(json, null, 2), "utf-8");
      console.log(`✅ Updated JSON: ${filePath}`);
    }
  } catch (err) {
    console.error(`❌ Failed to parse JSON: ${filePath}`, err);
  }
}

function walkDir(dir) {
  fs.readdirSync(dir).forEach((file) => {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      walkDir(fullPath);
    } else {
      processHtmlFile(fullPath);
      processJsonFile(fullPath);
    }
  });
}

walkDir(targetDir);
