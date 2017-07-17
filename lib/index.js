"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var http = require("http");
var server = http.createServer(function (req, res) {
    res.writeHead(200);
    res.end('Hello Http');
});
server.listen(58808);
console.log(2 + 2);
console.log('Cumulus started...');
console.log('Cumulus.. finished.. *cough*cough*die*');
