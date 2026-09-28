const http = require('http');
const httpProxy = require('http-proxy');

const VPS_IP = '185.126.65.38';   // ton IP VPS
const VPS_PORT = 10000;            // port que tu vas ouvrir dans S-UI
const PATH = '/DieuMagic';         // chemin secret

const proxy = httpProxy.createProxyServer({
  target: `ws://${VPS_IP}:${VPS_PORT}`,
  ws: true,
  changeOrigin: true
});

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('OK');
});

server.on('upgrade', (req, socket, head) => {
  if (req.url === PATH) {
    proxy.ws(req, socket, head);
  } else {
    socket.destroy();
  }
});

const PORT = process.env.PORT || 8080;
server.listen(PORT, () => console.log(`Proxy en écoute sur ${PORT}`));
