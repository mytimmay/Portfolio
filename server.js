import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3000;

// Statisches Hosting + automatische .html Erweiterung
app.use(express.static(__dirname, { extensions: ["html"] }));

// "en"-Präfix auf die gleichen Dateien wie ohne Präfix abbilden
app.use("/en", express.static(__dirname, { extensions: ["html"] }));

// 404-Fallback auf benutzerdefinierte Seite
app.use((req, res) => {
  res.status(404).type("html").sendFile(path.join(__dirname, "404.html"));
});

app.listen(PORT, () => {
  console.log(`Server läuft unter http://localhost:${PORT}`);
});
