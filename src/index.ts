// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
import express = require('express');
import weightroom from './weightroom';
const debug = require('debug');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin//,
    // output: process.stdout
});
const log = debug('cumulus:log');
const logDB = debug('cumulus:db');
const logRx = debug('cumulus:Rx');
const app = express();
const initOptions = {
    // 'postgres://cumulus:nineball@localhost:5432/cumulonimbus'
}
const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://cumulus:nineball@localhost:60888/cumulonimbus');

app.set('view engine', 'pug');
// app.get('/', function(req, res) {
//     res.send('Hello world!');
//     log(req);
// })
app.get('/', function(req, res) {
    res.render('index', {title: '[HInd] Weightroom', header: 'Welcome to the Weightroom', content: 'Foo. Bar.'});
    // log(req);
})

app.use('/wr', weightroom);
// app.get('/wr/wrestler', weightroom.wrestler);

app.listen(58808, function() {
    log('Cumulus listening on port 58808!');
})

log('Cumulus started...');

// db.one('SELECT * FROM workouts WHERE workout_id = 1', 123)
//     .then(function(data:any) {
//         logDB('DATA:', data);
//     })
//     .catch(function(error:any) {
//         logDB('ERROR:', error);
//     })

// console.log('\n\n\n');
import * as Rx from 'rxjs/Rx';
import './weightroom';
