var http = require('http');
var fs = require('fs');
var url = require('url');

var server = http.createServer((requisicao, resposta) => {
   var url_parts = url.parse(requisicao.url);
   var path = url_parts.pathname;

   fs.readFile(__dirname + path , (err, data) => {
      if(err) {
         resposta.writeHead(404, {'Content-Type': 'text/html'});
         resposta.write("Not Found");
      }else {
         resposta.writeHead(200, {'Content-Type': 'text/html'});
         resposta.write(data);
      }      
      resposta.end();
   });   
});

server.listen(3000);