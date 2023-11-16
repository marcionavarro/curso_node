const http = require("http");
const fs = require("fs");
const url = require("url");

const port = 3000;

const server = http.createServer((req, res) => {
  const q = url.parse(req.url, true);
  const filename = q.pathname.substring(1);

  function readFile(filename, statusCode) {
    fs.readFile(filename, function (err, data) {
      res.writeHead(statusCode, { "Content-Type": "text/html" });
      res.write(data);
      return res.end();
    });
  }

  if (filename.includes("html")) {
    if (!fs.existsSync(filename)) {
      readFile("404.html", 404);
      return;
    }
    readFile(filename, 200);
  }
});

server.listen(port, () => {
  console.log(`Servidor rodando na porta: ${port}`);
});
