const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;
const ROOT = __dirname;

// Support optional /en prefix
app.use((req, res, next) => {
  if (req.url === '/en') {
    req.url = '/';
  } else if (req.url.startsWith('/en/')) {
    req.url = req.url.slice(3); // remove /en
  }
  next();
});

// Serve static files and map URLs without extension to .html files
app.use(express.static(ROOT, {
  extensions: ['html']
}));

// Fallback to custom 404 page
app.use((req, res) => {
  res.status(404).sendFile(path.join(ROOT, '404.html'));
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
