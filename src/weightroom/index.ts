/**
 * Primary Route handler for weightroom stuff. Routes should come in to here,
 *   and this should reach out to Views to request correct info. Views should,
 *   well, provide it. Duh.
 */

import express = require('express');
import ViewModel from './views/wrestlers.viewmodel';
import { ConsoleWrestlers as View } from './views/console-wrestlers';
import { IndexView } from './views/index';
import { Model } from './model';
import { db } from '../api';

const debug = require('debug');
const log = debug('cumulus:weightroom');
const router: express.Router = express.Router();

const model = new Model;
const vm = new ViewModel(model);

vm.addWrestler('Joe');
vm.addWrestler('Bob');
vm.addWrestler('John Cena');
const view = new View(vm);
const indexView = new IndexView(vm);

router.get('/', (req, res, next) => {
    res.render('index', indexView.render());
})
router.get('/wrestlers', (req, res, next) => {
    res.render('wrestlers', { title: 'Wrestler', header: 'Wrestler List', wrestlers: vm.getState().wrestlers })
})
router.route('/wrestlers/add')
    .get((req, res, next) => {
    //     vm.addWrestler('Unidentified Dude-' + Math.ceil(Math.random() * 100));
        res.redirect('../wrestlers');
    })

/** This seems to work for now */
// fetch("http://localhost:58808/wr/wrestler/add", {
//     headers: {
//         'Content-Type': 'application/json'
//     },
//     method: "POST",
//     body: JSON.stringify({ a: 'foo', b: 'bar' })
// })
// .then((res) => console.log(res))
// .catch((res) => console.log(res))

    .post((req, res, next) => { // TODO: Figure out the Auth thing. Check into Passport and Helmet.
        log(req.body);
        req.body.name && vm.addWrestler(req.body.name);
        res.send();
    })
    .put((req, res, next) => {
        log(req.body);
        res.send();
    })
    .patch((req, res, next) => {
        log(req.body);
        res.send();
    })
router.get('/wrestlers/:wrestler_id', (req, res, next) => {
    res.render('wrestler-profile', { id: parseInt(req.params.wrestler_id), wrestler: vm.getWrestler(parseInt(req.params.wrestler_id))})
    // res.send([req.params, ...vm.getWrestler(parseInt(req.params.wrestler_id))]);
})

interface ExerciseSet {
    exercise: string,
    type: string,
    reps: number,
    weight: number
}
interface ExerciseGroup {
    name: string,
    sets: ExerciseSet[]
}
const datas = '{"wrestlers":[{"name":"Joe Book","age":31,"weight":310,"units":"imperial","workouts":[{"routine":"SL5x5-A","date":"2014-11-12 6:15 AM","duration":"1h 30m","sets":[{"num":1,"exercise":"squat","reps":5,"weight":45},{"num":2,"exercise":"squat","reps":5,"weight":45},{"num":3,"exercise":"squat","reps":5,"weight":85},{"num":4,"exercise":"squat","reps":3,"weight":125},{"num":5,"exercise":"squat","reps":2,"weight":170},{"num":6,"exercise":"squat","reps":5,"weight":215},{"num":7,"exercise":"squat","reps":5,"weight":215},{"num":8,"exercise":"squat","reps":10,"weight":215},{"num":9,"exercise":"bench press","reps":5,"weight":45},{"num":10,"exercise":"bench press","reps":5,"weight":45},{"num":11,"exercise":"bench press","reps":5,"weight":75},{"num":12,"exercise":"bench press","reps":3,"weight":105},{"num":13,"exercise":"bench press","reps":2,"weight":135},{"num":14,"exercise":"bench press","reps":5,"weight":150},{"num":14,"exercise":"bench press","reps":5,"weight":150},{"num":14,"exercise":"bench press","reps":10,"weight":150},{"num":15,"exercise":"pendlay row","reps":5,"weight":45},{"num":16,"exercise":"pendlay row","reps":5,"weight":45},{"num":17,"exercise":"pendlay row","reps":5,"weight":75},{"num":18,"exercise":"pendlay row","reps":3,"weight":105},{"num":19,"exercise":"pendlay row","reps":2,"weight":135},{"num":20,"exercise":"pendlay row","reps":5,"weight":150},{"num":21,"exercise":"pendlay row","reps":5,"weight":150},{"num":22,"exercise":"pendlay row","reps":8,"weight":150}]},{"routine":"SL5x5-B","date":"2014-11-10 9:15 AM","duration":"1h 45m","sets":[{"num":1,"exercise":"squat","reps":5,"weight":45},{"num":2,"exercise":"squat","reps":5,"weight":45},{"num":3,"exercise":"squat","reps":5,"weight":85},{"num":4,"exercise":"squat","reps":3,"weight":125},{"num":5,"exercise":"squat","reps":5,"weight":170},{"num":6,"exercise":"squat","reps":5,"weight":205},{"num":7,"exercise":"squat","reps":5,"weight":205},{"num":8,"exercise":"squat","reps":10,"weight":205},{"num":9,"exercise":"overhead press","reps":5,"weight":45},{"num":10,"exercise":"overhead press","reps":5,"weight":45},{"num":11,"exercise":"overhead press","reps":5,"weight":60},{"num":12,"exercise":"overhead press","reps":3,"weight":75},{"num":13,"exercise":"overhead press","reps":2,"weight":90},{"num":14,"exercise":"overhead press","reps":5,"weight":110},{"num":14,"exercise":"overhead press","reps":5,"weight":110},{"num":14,"exercise":"overhead press","reps":5,"weight":110},{"num":15,"exercise":"deadlift","reps":5,"weight":135},{"num":16,"exercise":"deadlift","reps":5,"weight":135},{"num":17,"exercise":"deadlift","reps":3,"weight":180},{"num":18,"exercise":"deadlift","reps":2,"weight":255},{"num":19,"exercise":"deadlift","reps":5,"weight":300}]},{"routine":"SL5x5-A","date":"2014-11-8 9:15 AM","duration":"1h 45m","sets":[{"num":1,"exercise":"squat","reps":5,"weight":45},{"num":2,"exercise":"squat","reps":5,"weight":45},{"num":3,"exercise":"squat","reps":5,"weight":80},{"num":4,"exercise":"squat","reps":3,"weight":120},{"num":5,"exercise":"squat","reps":2,"weight":160},{"num":6,"exercise":"squat","reps":5,"weight":205},{"num":7,"exercise":"squat","reps":5,"weight":205},{"num":8,"exercise":"squat","reps":10,"weight":205},{"num":9,"exercise":"bench press","reps":5,"weight":45},{"num":10,"exercise":"bench press","reps":5,"weight":45},{"num":11,"exercise":"bench press","reps":5,"weight":70},{"num":12,"exercise":"bench press","reps":3,"weight":95},{"num":13,"exercise":"bench press","reps":2,"weight":125},{"num":14,"exercise":"bench press","reps":5,"weight":140},{"num":14,"exercise":"bench press","reps":5,"weight":140},{"num":14,"exercise":"bench press","reps":10,"weight":140},{"num":15,"exercise":"pendlay row","reps":5,"weight":45},{"num":16,"exercise":"pendlay row","reps":5,"weight":45},{"num":17,"exercise":"pendlay row","reps":5,"weight":70},{"num":18,"exercise":"pendlay row","reps":3,"weight":95},{"num":19,"exercise":"pendlay row","reps":2,"weight":125},{"num":20,"exercise":"pendlay row","reps":5,"weight":140},{"num":21,"exercise":"pendlay row","reps":5,"weight":140},{"num":22,"exercise":"pendlay row","reps":8,"weight":140}]}]}],"exercises":[{"id":0,"name":"barbell squat"},{"id":1,"name":"bench press"},{"id":2,"name":"deadlift"},{"id":3,"name":"overhead press"},{"id":4,"name":"pendlay row"}],"routines":[{"name":"SL5x5","templates":[{"name":"SL5x5-A","sets":[{"num":5,"exercise":"squat"},{"num":5,"exercise":"bench press"},{"num":5,"exercise":"pendlay row"}]},{"name":"SL5x5-B","sets":[{"num":5,"exercise":"squat"},{"num":5,"exercise":"overhead press"},{"num":5,"exercise":"deadlift"}]}]}]}'
let wrestlers = JSON.parse(datas).wrestlers;

router.get('/workout-log', (req, res, next) => {
    res.render('workout-log', { // NOTE: Ask Jared about using views and nested queries instead of reducer.
        title: 'Sample Workout Log',
        workout: wrestlers[0].workouts[1].sets.reduce((acc: ExerciseGroup[], set: ExerciseSet): ExerciseGroup[] => {
            if (acc.length && acc[acc.length - 1].name === set.exercise) {
                acc[acc.length - 1].sets.push(set);
            } else {
                acc.push({
                    name: set.exercise,
                    sets: [set]
                })
            }
            return acc;
        }, [])
    });
})
export default router;
