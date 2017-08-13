import * as express from 'express';
import { ColumnSet, IDatabase, IOptions } from 'pg-promise';
import * as pgPromise from 'pg-promise';

import ExercisesRepo from './repos/exercises';
import WrestlersRepo from './repos/wrestlers';

/**
 * DB module!
 *
 * https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
 */

export interface IExtensions {
    wrestlers: WrestlersRepo,
    exercises: ExercisesRepo,
    cols: {
        wrestler: ColumnSet,
        workout: ColumnSet,
        exercise_set: ColumnSet,
        exercise: ColumnSet,
    }
}

const initOptions: IOptions<IExtensions> = {
    capSQL: true,
    extend: (obj: IExtensions, dc: any) => {
        obj.wrestlers = new WrestlersRepo(obj, dc);
        obj.exercises = new ExercisesRepo(obj, dc);
        obj.cols = {
            wrestler: new pgp.helpers.ColumnSet([
                'wrestler_name',
                { name: 'wrestler_age', def: null },
                { name: 'wrestler_weight', def: null },
                { name: 'wrestler_weight_unit', def: 1 }
            ], { table: 'wrestlers' }),
            workout: new pgp.helpers.ColumnSet([
                'wrestler_id',
                { name: 'workout_date', def: new Date },
                { name: 'routine_id', def: null },
                { name: 'routine_template_id', def: null },
                { name: 'workout_duration', def: null },
                { name: 'workout_label', def: null }
            ], { table: 'workouts' }),
            exercise_set: new pgp.helpers.ColumnSet([
                'exercise_id',
                'workout_id',
                'exercise_reps',
                'exercise_weight',
                { name: 'routine_set_id', def: null },
                { name: 'exercise_weight_unit', def: 1 }
            ], { table: 'exercise_sets' }),
            exercise: new pgp.helpers.ColumnSet([
                'exercise_name'
            ], { table: 'exercises' }),
            // routine: new pgp.helpers.ColumnSet([
            //     'routine_label'
            // ], { table: 'routines' }),
            // routine_template: new pgp.helpers.ColumnSet([
            //     'routine_id',
            //     'routine_name'
            // ], { table: 'routine_templates' }),
            // routine_set: new pgp.helpers.ColumnSet([
            //     'routine_id',
            //     'routine_template_id',
            //     'exercise_id',
            //     'exercise_reps',
            //     { name: 'exercise_weight', def: null }
            // ], { table: 'routine_sets' })
        }
    }
}

// 'postgres://cumulus:nineball@localhost:5432/cumulonimbus'
export const pgp = pgPromise(initOptions);
const cn = process.env.DATABASE_URL as string;
const db = <IDatabase<IExtensions> & IExtensions>pgp(cn);

export default db;
