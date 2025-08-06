import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Statisches Hosting + automatische .html Erweiterung
app.use(express.static(__dirname, { extensions: ["html"] }));

// Handle /en/* URLs -> entferne /en und bediene lokale HTML-Datei
app.use("/en", (req, res, next) => {
  let page = req.path === "/" ? "/index" : req.path;
  res.sendFile(path.join(__dirname, page + ".html"), (err) => {
    if (err) next();
  });
});

// Fallback: URLs ohne .html bedienen
app.get("*", (req, res, next) => {
  let page = req.path === "/" ? "/index" : req.path;
  res.sendFile(path.join(__dirname, page + ".html"), (err) => {
    if (err) next();
  });
});

app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});
