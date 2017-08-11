/**
 * DB module!
 *
 * https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
 */

import express = require('express');
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';
import * as url from 'url';

const pgp: IMain = pgPromise({
    capSQL: true
    // 'postgres://cumulus:nineball@localhost:5432/cumulonimbus'
})


const cn: string = process.env.DATABASE_URL as string;
export const db: IDatabase<any> = pgp(cn);

const cols = {
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
    routine: new pgp.helpers.ColumnSet([
        'routine_label'
    ], { table: 'routines' }),
    routine_template: new pgp.helpers.ColumnSet([
        'routine_id',
        'routine_name'
    ], { table: 'routine_templates' }),
    routine_set: new pgp.helpers.ColumnSet([
        'routine_id',
        'routine_template_id',
        'exercise_id',
        'exercise_reps',
        { name: 'exercise_weight', def: null }
    ], { table: 'routine_sets' }),


}

function getWrestlersByIdFull(req: express.Request, res: express.Response) {
    Promise.all([
        db.one('SELECT * FROM wrestlers WHERE wrestler_id = ${wrestler_id}', req.params),
        db.many('SELECT * FROM workouts WHERE wrestler_id = ${wrestler_id}', req.params)
    ])
        .then(data => res.send({ wrestler: data[0], workouts: data[1] }))
        .catch(error => res.send(error));
}

function getWorkoutsByWrestlerAndId(req: express.Request, res: express.Response) {
    db.one('SELECT * FROM workouts WHERE workout_id = ${workout_id} AND wrestler_id = ${wrestler_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.status(404).send({ error: error.name, query: error.query }));
}

function selectAllItems(table: string) {
    return function(req: express.Request, res: express.Response) {
        db.many(`SELECT * FROM ${table}`)
            .then(data => res.send(data))
            .catch(error => res.send(error));
    }
}

function selectAllItemsByClause(table: string, label: string) {
    return function(req: express.Request, res: express.Response) {
        db.one(`SELECT * FROM ${table} WHERE ${label} = \$\{${label}\}`, req.params)
            .then(data => res.send(data))
            .catch(error => res.send(error));
    }
}

function insertItemIntoTable(id: string, colSet: pgPromise.ColumnSet) {
    return function(req: express.Request, res: express.Response) {
        db.one(pgp.helpers.insert(req.body, colSet) + ` RETURNING *`, req.body)
            .then(data => res.status(201)
                .location('' + req.get('origin') + url.parse(req.url).pathname + '/' + data[id])
                .send(data))
            .catch(error => res.send(error));
    }
}

function updateItemInTable(id: string, colSet: pgPromise.ColumnSet) {
    return function(req: express.Request, res: express.Response) {
        db.one(pgp.helpers.update(req.body, colSet) + ` WHERE ${id} = \$\{${id}\} RETURNING *`, req.params)
            .then(data => res.send(data))
            .catch(error => res.send(error));
    }
}

// function deleteItemByClause(table: string, label: string) {
//     return genericItemsByClause('DELETE', table, label);
// }
let api;
export default api = {
    getExercises: selectAllItems('exercises'),
    getWrestlers: selectAllItems('wrestlers'),
    getRoutines: selectAllItems('routines'),
    getExercisesById: selectAllItemsByClause('exercises', 'exercise_id'),
    getWrestlersById: selectAllItemsByClause('wrestlers', 'wrestler_id'),
    getWorkoutsByWrestler: selectAllItemsByClause('exercises', 'wrestler_id'),
    getRoutinesById: selectAllItemsByClause('routines', 'routine_id'),
    getWorkoutsByWrestlerAndId: getWorkoutsByWrestlerAndId,
    getWrestlersByIdFull: getWrestlersByIdFull,
    insertWrestler: insertItemIntoTable('wrestler_id', cols.wrestler),
    insertWorkout: insertItemIntoTable('workout_id', cols.workout),
    insertRoutine: insertItemIntoTable('routine_id', cols.routine),
    insertExercise: insertItemIntoTable('exercise_id', cols.exercise),
    updateWrestlerById: updateItemInTable('wrestler_id', cols.wrestler),
    updateWorkoutById: updateItemInTable('workout_id', cols.workout),
    updateRoutineById: updateItemInTable('routine_id', cols.routine),
    updateExerciseById: updateItemInTable('exercise_id', cols.exercise)

    // deleteWrestlerById: deleteItemByClause('wrestlers', 'wrestler_id'),
    // deleteWorkoutById: deleteItemByClause('workouts', 'workout_id'),
    // deleteSetById: deleteItemByClause('exercise_sets', 'exercise_set_id')
};

