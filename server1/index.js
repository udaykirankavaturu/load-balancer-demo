const http = require("http");
http
  .createServer((req, res) => {
    setTimeout(() => {
      // Simulate processing time
      res.end("Response from Server 1");
    }, 5000);
  })
  .listen(3001, () => console.log("Server 1 listening on port 3001"));
