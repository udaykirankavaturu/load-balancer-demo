const http = require("http");
http
  .createServer((req, res) => {
    setTimeout(() => {
      res.end("Response from Server 2");
    }, 5000);
  })
  .listen(3002, () => console.log("Server 2 listening on port 3002"));
