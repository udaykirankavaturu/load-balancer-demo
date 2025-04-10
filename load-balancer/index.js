const http = require("http");
const httpProxy = require("http-proxy");

const proxy = httpProxy.createProxyServer({});

// server list
const servers = [
  { target: "http://localhost:3001", activeConnections: 0 },
  { target: "http://localhost:3002", activeConnections: 0 },
];

// Find the server with the least active connections
function getLeastConnectionsServer() {
  return servers.reduce(
    (min, curr) =>
      curr.activeConnections < min.activeConnections ? curr : min,
    servers[0]
  );
}

// Create the load balancer server
const server = http.createServer((req, res) => {
  const targetServer = getLeastConnectionsServer();
  targetServer.activeConnections++;

  console.log(
    `Forwarding to ${targetServer.target} (Active: ${targetServer.activeConnections})`
  );

  proxy.web(req, res, { target: targetServer.target }, (err) => {
    res.writeHead(502);
    res.end("Bad Gateway");
    targetServer.activeConnections--;
  });

  res.on("finish", () => {
    targetServer.activeConnections--;
    console.log(
      `Finished request to ${targetServer.target} (Active: ${targetServer.activeConnections})`
    );
  });
});

server.listen(3000, () => {
  console.log("Load Balancer listening on port 3000");
});
