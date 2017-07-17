// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
import express = require('express');
const app = express();

app.get('/', function(req, res) {
    res.send('Hello world!');
})

app.listen(58808, function() {
    console.log('Cumulus listening on port 58808!');
})

console.log(2+2);
console.log('Cumulus started...');

console.log('Cumulus.. finished.. *cough*cough*die*');
