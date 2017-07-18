"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
const express = require("express");
const app = express();
const initOptions = {};
const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://cumulus:nineball@localhost:5432/cumulonimbus');
app.get('/', function (req, res) {
    res.send('Hello world!');
    console.log(req);
});
app.listen(58808, function () {
    console.log('Cumulus listening on port 58808!');
});
console.log(2 + 2);
console.log('Cumulus started...');
console.log('Cumulus.. finished.. *cough*cough*die*');
console.log(db);
db.one('SELECT $1 AS value', 123)
    .then(function (data) {
    console.log('DATA:', data.value);
})
    .catch(function (error) {
    console.log('ERROR:', error);
});
