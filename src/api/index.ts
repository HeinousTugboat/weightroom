import * as express from 'express';
import wrestlers from './wrestlers';
import exercises from './exercises';
import db from '../db';

/**
 * DB module!
 *
 * https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
 */

const debug = require('debug');
const log = debug('cumulus:api');
const router: express.Router = express.Router();

router.route('/wrestlers')
    .get(wrestlers.getAllWrestlers)
    .post(wrestlers.insertWrestler)
router.route('/wrestlers/:wrestler_id')
    .get(wrestlers.getWrestlerById)
    .put(wrestlers.updateWrestler)
router.get('/wrestlers/:wrestler_id/full', wrestlers.getWrestlersFull);
router.route('/wrestlers/:wrestler_id/workouts')
    .get(wrestlers.getWorkouts)
    .post(wrestlers.insertWorkout)
router.route('/wrestlers/:wrestler_id/workouts/:workout_id')
    .get(wrestlers.getWorkoutsById)
    .put(wrestlers.updateWorkout)
router.route('/exercises')
    .get(exercises.getExercises)
    .post(exercises.insertExercise)
router.route('/exercises/:exercise_id')
    .get(exercises.getExerciseById)
    .put(exercises.updateExercise)

export default router;
