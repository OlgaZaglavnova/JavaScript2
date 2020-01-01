const http = require('http');
const staticServer = require('node-static');

const file = new staticServer.Server('.');

http.createServer((req, res) => {
  file.serve(req, res)
}).listen(3000);
