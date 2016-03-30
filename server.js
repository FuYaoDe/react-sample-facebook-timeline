var http = require('http'),
    fs = require('fs');

http.createServer(function(req, res) {
  console.log(req.url);
  if(req.url.indexOf('.js') != -1) {
    fs.readFile('demo.js', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/javascript'});
      res.write(data);
      res.end();
    });
  }else if(req.url.indexOf('.css') != -1) {
    fs.readFile('style.css', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/css'});
      res.write(data);
      res.end();
    });
  }else{
    fs.readFile('index.html', function (err, data) {
      if (err) console.log(err);
      res.writeHead(200, {'Content-Type': 'text/html'});
      res.write(data);
      res.end();
    });
  }
}).listen(3000);
