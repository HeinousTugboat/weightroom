import { IMain } from 'pg-promise';

import { pgp } from '../../db';
import { exerciseJSON, workoutJSON, wrestlerJSON } from '../../models/json-interfaces';
import { Workout } from '../../models/workout';
import Wrestler from '../../models/wrestler';

export default class WorkoutsRepository {
    constructor(private db: any, private pgp: IMain) { }

    // create() { }
    // init() { }
    // drop() { }
    // empty() { }

    add(workout: Workout): Promise<workoutJSON> {
        return this.db.one(pgp.helpers.insert(workout, this.db.cols.workout) + ` RETURNING *`, workout);
    }
    // remove() { }

    // TODO: Add pagination..
    // TODO: Possibly refactor name..
    find(id: number): Promise<workoutJSON[]> {
        return this.db.any('SELECT * FROM workouts WHERE wrestler_id = $1 ORDER BY workout_date DESC, workout_id DESC', id);
    }
    findByWrestler(workoutId: number, wrestlerId: number): Promise<workoutJSON> {
        return this.db.one('SELECT * FROM workouts WHERE workout_id = $1 AND wrestler_id = $2', [workoutId, wrestlerId]);
    }
    update(id: number, workout: Workout): Promise<workoutJSON> {
        return this.db.oneOrNone(pgp.helpers.update(workout, this.db.cols.workout) + ' WHERE workout_id = $1 RETURNING *', id);
    }
    // total() { }
}
