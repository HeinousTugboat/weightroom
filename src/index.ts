// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
import express = require('express');
import sass = require('node-sass-middleware');
import weightroom from './weightroom';
import * as Rx from 'rxjs/Rx';
import * as bodyParser from 'body-parser';

import { db } from './db';
import * as api from './db';

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
app.get('/sink', (req, res) => res.render('sink', { title: '[HInd] Kitchen Sink' }) )
app.use('/wr', weightroom);
app.get('/db/exercises', api.getExercises);
app.get('/db/exercises/:exercise_id', api.getExercisesById);
app.get('/db/routines', api.getRoutines);
app.get('/db/routines/:routine_id', api.getRoutinesById);
app.get('/db/wrestlers', api.getWrestlers);
app.get('/db/wrestlers/:wrestler_id', api.getWrestlersById);
app.get('/db/wrestlers/:wrestler_id/full', api.getWrestlersByIdFull);
app.get('/db/wrestlers/:wrestler_id/workouts', api.getWorkoutsByWrestler);
app.get('/db/wrestlers/:wrestler_id/workouts/:workout_id', api.getWorkoutsById);

app.get('/db/exercise_sets', (req, res) => {
    db.many('SELECT * FROM exercise_sets')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})
app.get('/db/exercise_sets/:exercise_set_id', (req, res) => {
    db.one('SELECT * FROM exercise_sets WHERE exercise_set_id = ${exercise_set_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.send(error));
})
app.get('/db/workouts', (req, res) => {
    db.many('SELECT * FROM workouts')
        .then((data: any) => res.send(data))
        .catch((error: Error) => res.send(error));
})
app.get('/db/workouts/:workout_id', (req, res) => {
    db.one('SELECT * FROM workouts WHERE workout_id = ${workout_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.send(error));
})

app.use(express.static('public'));
app.use('/js', express.static('lib/public'));

app.listen(58808, () => log('Cumulus listening on port 58808!'))

log('Cumulus started...');
