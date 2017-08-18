import { Workout } from '../models/workout';
import * as express from 'express';
import * as pgPromise from 'pg-promise';

import db from '../db';
import { exerciseJSON, workoutJSON, wrestlerJSON } from '../models/json-interfaces';
import Wrestler from '../models/wrestler';

/**
 * Primary Route handler for weightroom stuff. Routes should come in to here,
 *   and this should reach out to Views to request correct info. Views should,
 *   well, provide it. Duh.
 */

const debug = require('debug');
const log = debug('cumulus:weightroom');
const router: express.Router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/wrestlers', (req, res, next) => {
    let wrestlers: wrestlerJSON[];
    db.wrestlers.all()
        .then(data => Promise.resolve(data.map(x => Wrestler.fromJSON(x))))
        .then(wrestlers => res.render('wrestlers', { title: 'Wrestler', header: 'Wrestler List', wrestlers: wrestlers }));
})
router.get('/wrestlers/add', (req, res, next) => {
    res.redirect('../wrestlers');
})
function isWrestlerJSON(data: wrestlerJSON | workoutJSON[]): data is wrestlerJSON {
    return (<wrestlerJSON>data).wrestler_name !== undefined && (<wrestlerJSON>data).wrestler_id !== undefined;
}
router.get('/wrestlers/:wrestler_id', (req, res, next) => {
    db.wrestlers.findByIdFull(req.params.wrestler_id)
        .then(data => Promise.resolve(data.reduce((acc: Wrestler, val) => {
            if (isWrestlerJSON(val)) {
                return Wrestler.fromJSON(val);
            } else {
                acc.workouts = val.map((workout: workoutJSON) => Workout.fromJSON(acc, workout));
                return acc;
            }
        }, (<Wrestler>{}))))
        .then(wrestler => res.render('wrestler-profile', wrestler))
})
router.get('/wrestlers/:wrestler_id/workouts', (req, res, next) => {
    res.redirect(req.baseUrl + '/wrestlers/' + req.params.wrestler_id);
})
router.get('/wrestlers/:wrestler_id/workouts/:workout_id', (req, res, next) => {
    Promise.all([
        db.wrestlers.findById(req.params.wrestler_id),
        db.workouts.findByWrestler(req.params.workout_id, req.params.wrestler_id),
        db.sets.find(req.params.workout_id)
    ]).then(data => {
        let wrestler = Wrestler.fromJSON(data[0]);
        let workout;
        if (data[1]) {
            workout = Workout.fromJSON(wrestler, data[1]);
        } else {
            res.status(404).send('Workout Not Found..');
        }
        if (data[2]) {
            res.render('workout', { wrestler: wrestler, workout: workout, sets: data[2] });
        } else {
            res.render('workout', { wrestler: Wrestler, workout: Workout, sets: [] });
        }
    }).catch((error: pgPromise.errors.QueryResultError) => res.status(404).send({ error: error.name, query: error.query }));
})

export default router;
