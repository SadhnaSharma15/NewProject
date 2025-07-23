import { createServer } from 'http';
import { readFile } from 'fs/promises';
import path from 'path';

const PORT = 3003;

const serveFile = async (res, filepath, contentType) => {
  try {
    const data = await readFile(filepath);
    res.writeHead(200, { 'Content-Type': contentType });
    res.end(data);
  } catch {
    res.writeHead(404, { 'Content-Type': 'text/plain' });
    res.end("404: Page not found");
  }
};

const server = createServer((req, res) => {
  console.log(req.method, req.url);

  if (req.method === "GET") {
    if (req.url === "/") {
      return serveFile(res, path.join('public', 'index.html'), 'text/html');
    } else if (req.url === "/style.css") {
      return serveFile(res, path.join('public', 'style.css'), 'text/css');
    }
  }

  res.writeHead(404, {'Content-Type': 'text/plain'});
  res.end('404: Page not found');
});

server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
