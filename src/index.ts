// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
import express = require('express');
import sass = require('node-sass-middleware');
import weightroom from './weightroom';
import * as Rx from 'rxjs/Rx';
import * as bodyParser from 'body-parser';

import { db } from './db';

const debug = require('debug');
const log = debug('cumulus:log');
const logDB = debug('cumulus:db');
const logRx = debug('cumulus:Rx');
const app = express();

app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(sass({
    src: 'stylesheets',
    response: true,
    indentedSyntax: false
}))

app.get('/', (req, res) => {
    res.render('index', { title: '[HInd] Weightroom', header: 'Welcome to the Weightroom', content: 'Foo. Bar.' });
})

app.use('/wr', weightroom);

app.get('/sink', (req, res) => res.render('sink', { title: '[HInd] Kitchen Sink' }) )

app.get('/db/exercise_sets', (req, res) => {
    db.many('SELECT * FROM exercise_sets')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})
app.get('/db/exercises', (req, res) => {
    db.many('SELECT * FROM exercises')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})
app.get('/db/routines', (req, res) => {
    db.many('SELECT * FROM routines')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})
app.get('/db/workouts', (req, res) => {
    db.many('SELECT * FROM workouts')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})
app.get('/db/wrestlers', (req, res) => {
    db.many('SELECT * FROM wrestlers')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})

app.use(express.static('public'));
app.use('/js', express.static('lib/public'));

app.listen(58808, () => log('Cumulus listening on port 58808!'))

log('Cumulus started...');
