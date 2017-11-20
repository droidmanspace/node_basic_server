var fs = require('fs');
var http = require('http');
var path = require('path')
http.createServer((req,res)=>{
var filePath = req.url;
console.log(filePath)
if (filePath == '/')
  filePath = '/index.html';
filePath = __dirname+filePath;
var extname = path.extname(filePath);
var contentType = 'text/html';
switch (extname) {
    case '.js':
        contentType = 'text/javascript';
        break;
    case '.css':
        contentType = 'text/css';
        break;
}
fs.exists(filePath, function(exists) {
    if (exists) {
        fs.readFile(filePath, function(error, content) {
            if (error) {
                res.writeHead(500);
                res.end();
            }
            else {                   
                res.writeHead(200, { 'Content-Type': contentType });
                res.end(content, 'utf-8');                  
            }
        });
    }
});
}).listen(80,'test');