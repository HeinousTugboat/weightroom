import { IMain } from 'pg-promise';

import { pgp } from '../../db';
import { exerciseJSON, workoutJSON, wrestlerJSON } from '../../models/json-interfaces';
import { Workout } from '../../models/workout';
import Wrestler from '../../models/wrestler';

export default class WrestlersRepository {
    constructor(private db: any, private pgp: IMain) { }

    // create() { }
    // init() { }
    // drop() { }
    // empty() { }

    add(wrestler: Wrestler): Promise<wrestlerJSON> {
        return this.db.one(pgp.helpers.insert(wrestler, this.db.cols.wrestler) + ` RETURNING *`, wrestler);
    }
    // remove() { }
    findById(id: number): Promise<wrestlerJSON> {
        return this.db.oneOrNone('SELECT * FROM wrestlers WHERE wrestler_id = $1', id);
    }
    findByIdFull(id: number): Promise<(wrestlerJSON | workoutJSON[])[]> {
        return Promise.all([
            this.db.oneOrNone('SELECT * FROM wrestlers WHERE wrestler_id = $1', id),
            this.db.any('SELECT * FROM workouts WHERE wrestler_id = $1', id)
        ]);
    }
    findByName(name: string): Promise<wrestlerJSON> {
        return this.db.oneOrNone('SELECT * FROM wrestlers WHERE wrestler_name = $1', name);
    }
    update(id: number, wrestler: Wrestler): Promise<wrestlerJSON> {
        return this.db.oneOrNone(pgp.helpers.update(wrestler, this.db.cols.wrestler) + ' WHERE wrestler_id = $1 RETURNING *', id);
    }
    all(): Promise<wrestlerJSON[]> {
        return this.db.any('SELECT * FROM wrestlers');
    }
    // total() { }

    addWorkout(workout: Workout): Promise<workoutJSON> {
        return this.db.one(pgp.helpers.insert(workout, this.db.cols.workout) + ` RETURNING *`, workout);
    }
    // remove() { }
    findWorkouts(id: number): Promise<workoutJSON[]> {
        return this.db.any('SELECT * FROM workouts WHERE wrestler_id = $1', id);
    }
    findWorkoutById(workoutId: number, wrestlerId: number): Promise<workoutJSON> {
        return this.db.one('SELECT * FROM workouts WHERE workout_id = $1 AND wrestler_id = $2', [workoutId, wrestlerId]);
    }
    updateWorkout(id: number, workout: Workout): Promise<workoutJSON> {
        return this.db.oneOrNone(pgp.helpers.update(workout, this.db.cols.workout) + ' WHERE workout_id = $1 RETURNING *', id);
    }
    // total() { }
}
