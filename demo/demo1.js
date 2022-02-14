const http = require('http');

const server = http.createServer();

server.on('request', (req, res) => {
  console.log(req.headers);
  if (req.url === '/') {
    // res.setHeader('Content-Type', 'text/html; charset=utf8');
    res.write('hello world');
    res.end();
  }
});

server.listen(8081, () => {
  console.log('success');
});
