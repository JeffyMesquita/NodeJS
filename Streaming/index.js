var fs = require('fs'),
   http = require('http'),
   url = require('url'),
   path = require('path');

http.createServer((requisicao, resposta) => {
   if(requisicao.url !== '/movie.mp4'){
      resposta.writeHead(200, {"Content-Type": "text/html"});
      resposta.end('<video src="http://localhost:3000/movie.mp4" controls></video>');
   }else{
      var file = path.resolve(__dirname, "movie.mp4");
      var range = requisicao.headers.range;
      var positions = range.replace(/bytes=/, "").split('-');
      var start = parseInt(positions[0], 10);

      fs.stat(file, (err, stats) => {
         var total = stats.size;
         var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
         var chunksize = (end - start) + 1;

         resposta.writeHead(200,  {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Lenght": chunksize,
            "Content-Type": "video/mp4",
         });

         var stream = fs.createReadStream(file, {start: start, end: end}).on("open", () => {
            stream.pipe(resposta);
         }).on("error", (err) => {
            resposta.end(err);
         });
      });
   }
}).listen(3000);


http.createServer((requisicao, resposta) => {
   if(requisicao.url !== '/movie.mp4'){
      resposta.writeHead(206, {"Content-Type": "text/html"});
      resposta.end('<video src="http://localhost:3001/movie.mp4" controls></video>');
   }else{
      var file = path.resolve(__dirname, "movie.mp4");

      fs.readFile(file, (err, content) => {
         if(err){
            resposta.writeHead(500);
            resposta.end();
         }else{
            resposta.writeHead(200, {
               "Content-Type":"video/mp4"
            });
            resposta.end(content);
         }
      })
   }
}).listen(3001);