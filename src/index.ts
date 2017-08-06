// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
import express = require('express');
import sass = require('node-sass-middleware');
import weightroom from './weightroom';
import * as Rx from 'rxjs/Rx';
import * as bodyParser from 'body-parser';

import { db } from './api';
import api from './api';

const debug = require('debug');
const log = debug('cumulus:log');
const logAPI = debug('cumulus:api');
const logRx = debug('cumulus:Rx');
const app = express();

function LC(req: express.Request, res: express.Response, next: express.NextFunction) {
    logAPI(`+${req.method} ${req.url} ${JSON.stringify(req.body)}`);
    res.send(req.body);
    next();
}
function LCN(req: express.Request, res: express.Response, next: express.NextFunction) {
    logAPI(`!${req.method} ${req.url}`);
    next();
}

app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(sass({
    src: 'stylesheets',
    response: true,
    indentedSyntax: false
}));

app.route('/:path*').put(LCN).post(LCN).delete(LCN)
app.get('/', (req, res) => {
    res.render('index', { title: '[HInd] Weightroom', header: 'Welcome to the Weightroom', content: 'Foo. Bar.' });
});
app.get('/sink', (req, res) => res.render('sink', { title: '[HInd] Kitchen Sink' }))
app.use('/wr', weightroom);
app.route('/api/exercises')
    .get(api.getExercises)
    .post(api.insertExercise)
    // .delete(LC)
app.route('/api/exercises/:exercise_id')
    .get(api.getExercisesById)
    .put(LC)
    // .delete(LC)
app.route('/api/routines')
    .get(api.getRoutines)
    .post(api.insertRoutine)
    // .delete(LC)
app.route('/api/routines/:routine_id')
    .get(api.getRoutinesById)
    .put(LC)
    // .delete(LC)
app.route('/api/wrestlers')
    .get(api.getWrestlers)
    .post(api.insertWrestler)
    // .delete(LC)
app.route('/api/wrestlers/:wrestler_id')
    .get(api.getWrestlersById)
    .put(LC)
    // .delete(api.deleteWrestlerById)
app.get('/api/wrestlers/:wrestler_id/full', api.getWrestlersByIdFull);
app.route('/api/wrestlers/:wrestler_id/workouts')
    .get(api.getWorkoutsByWrestler)
    .post(api.insertWorkout)
    // .delete(LC)
app.route('/api/wrestlers/:wrestler_id/workouts/:workout_id')
    .get(api.getWorkoutsByWrestlerAndId)
    .put(LC)
    // .delete(api.deleteWorkoutById)

app.use(express.static('public'));
app.use('/vendor', express.static('vendor'));
app.listen(58808, () => log('Cumulus listening on port 58808!'));

log('Cumulus started...');
