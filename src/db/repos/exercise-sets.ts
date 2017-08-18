import { IMain } from 'pg-promise';

import { pgp } from '../../db';
import { exerciseJSON, exerciseSetJSON, wrestlerJSON } from '../../models/json-interfaces';
import { ExerciseSet, Workout } from '../../models/workout';
import Wrestler from '../../models/wrestler';

export default class ExerciseSetsRepo {
    constructor(private db: any, private pgp: IMain) { }

    // create() { }
    // init() { }
    // drop() { }
    // empty() { }

    add(set: ExerciseSet): Promise<exerciseSetJSON> {
        return this.db.one(pgp.helpers.insert(set, this.db.cols.workout) + ` RETURNING *`, set);
    }
    // remove() { }
    find(workoutId: number): Promise<exerciseSetJSON[]> {
        return this.db.any('SELECT * FROM exercise_sets WHERE workout_id = $1', workoutId);
    }
    update(id: number, set: ExerciseSet): Promise<exerciseSetJSON> {
        return this.db.oneOrNone(pgp.helpers.update(set, this.db.cols.exercise_sets) + ' WHERE exercise_set_id = $1 RETURNING *', id);
    }
    delete(id: number) {
        return this.db.one('DELETE FROM exercise_sets WHERE exercise_set_id = $1 RETURNING *', id);
    }
    // total() { }
}
