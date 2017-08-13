import { exerciseJSON } from '../../models/json-interfaces';
import { IDatabase, IMain } from 'pg-promise';
import { pgp } from '../../db';
import {Exercise} from '../../models/workout';

export default class ExercisesRepository {
    constructor(private db: any, private pgp: IMain) { }

    // create() { }
    // init() { }
    // drop() { }
    // empty() { }

    add(exercise: Exercise): Promise<exerciseJSON> {
        return this.db.one(pgp.helpers.insert(exercise, this.db.cols.exercise) + ` RETURNING *`, exercise);
    }
    // remove() { }
    findById(id: number): Promise<exerciseJSON> {
        return this.db.oneOrNone('SELECT * FROM exercises WHERE exercise_id = $1', id);
     }
    // findByName() { }
    update(id: number, exercise: Exercise): Promise<exerciseJSON> {
        return this.db.oneOrNone(pgp.helpers.update(exercise, this.db.cols.exercise) + ' WHERE exercise_id = $1 RETURNING *', id);
    }
    all(): Promise<exerciseJSON[]> {
        return this.db.any('SELECT * FROM exercises');
    }
    // total() { }
}
