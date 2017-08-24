import { Exercise, ExerciseBlock, ExerciseSet, Workout } from '../models/workout';
import * as express from 'express';
import * as pgPromise from 'pg-promise';

import db from '../db';
import { exerciseJSON, exerciseSetJSON, workoutJSON, wrestlerJSON } from '../models/json-interfaces';
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

router.get('/rando', (req, res, next) => {
    res.render('rando-wrestler');
})

router.get('/wrestlers', (req, res, next) => {
    let wrestlers: wrestlerJSON[];
    db.wrestlers.all()
        .then(data => Promise.resolve(data.map(x => Wrestler.fromJSON(x))))
        .then(wrestlers => res.render('wrestlers', { title: 'Wrestler', header: 'Wrestler List', wrestlers: wrestlers, view: 'wrestler-list' }));
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
        .then(wrestler => res.render('wrestler-profile', {...wrestler, view: 'wrestler-profile'}))
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
        let workout: Workout;
        if (data[1]) {
            workout = Workout.fromJSON(wrestler, data[1]);
            if (data[2]) {
                let reduction = data[2].reduce((acc, val) => {
                    let set = ExerciseSet.fromJSON(workout, val);
                    if (set.setNumber < acc.num) {
                        set.setNumber = acc.num;
                    }
                    acc.sets.push(set);
                    acc.num++;
                    let currSet = acc.exercises[acc.exercises.length-1];
                    if ((set.exercise && currSet.exercise && set.exercise.name === currSet.exercise.name) || (set.exercise == currSet.exercise)) {
                        currSet.sets.push(set);
                    } else {
                        acc.exercises.push({exercise:set.exercise, sets: [set]});
                    }
                    return acc;
                }, {sets: <ExerciseSet[]>[], exercises: <ExerciseBlock[]>[{exercise: undefined, sets: []}], num: 1});
                workout.sets = reduction.sets;
                workout.exercises = reduction.exercises.filter(val=>val.sets.length);
            }
            res.render('workout', { wrestler: wrestler, workout: workout, view: 'workout-detail' });
        } else {
            res.status(404).send('Workout Not Found..');
        }
    }).catch((error: pgPromise.errors.QueryResultError) => res.status(404).send({ error: error.name, query: error.query, message: 'Some sort of Error in weightroom/workout/workout_id..'}));
})

export default router;
