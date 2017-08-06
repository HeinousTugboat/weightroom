/**
 * DB module!
 *
 * https://github.com/vitaly-t/pg-promise-demo/tree/master/TypeScript
 */

import express = require('express');
import { IMain, IDatabase } from 'pg-promise';
import * as pgPromise from 'pg-promise';

const pgp:IMain = pgPromise({
    // 'postgres://cumulus:nineball@localhost:5432/cumulonimbus'
})

const cn: string = process.env.DATABASE_URL as string;
export const db: IDatabase<any> = pgp(cn);

function getWrestlersByIdFull(req: express.Request, res: express.Response) {
    Promise.all([
            db.one('SELECT * FROM wrestlers WHERE wrestler_id = ${wrestler_id}', req.params),
            db.many('SELECT * FROM workouts NATURAL JOIN routines WHERE wrestler_id = ${wrestler_id}', req.params)
    ])
        .then(data => res.send({ wrestler: data[0], workouts: data[1] }))
        .catch(error => res.send(error));
}

function getWorkoutsByWrestlerAndId(req: express.Request, res: express.Response) {
    db.one('SELECT * FROM workouts WHERE workout_id = ${workout_id} AND wrestler_id = ${wrestler_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.status(404).send({error: error.name, query: error.query}));
}

function genericItemsByClause(method: string, table: string, label?: string) {
    if (label) {
        return function(req: express.Request, res: express.Response) {
            db.one(`${method} FROM ${table} WHERE ${label} = \$\{${label}\}`, req.params)
                .then(data => res.send(data))
                .catch(error => res.send(error));
        }
    } else {
        return function(req: express.Request, res: express.Response) {
            db.many(`${method} FROM ${table}`)
                .then(data => res.send(data))
                .catch(error => res.send(error));
        }
    }
}

function insertItemIntoTable(table: string, id: string, values: string[]) {
    let valString = values.reduce((acc, val, idx, arr) => {
        return acc + '${' + val + ((idx + 1 === arr.length) ? '}' : '}, ');
    }, '');
    return function(req: express.Request, res: express.Response) {
        db.one(`INSERT INTO ${table}(\$\{this~\}) VALUES(${valString}) RETURNING ${id}`, req.body)
            .then(data => res.status(201).location(req.get('referer')+'/'+data[id]).send(data))
            .catch(error => res.send(error));
    }
}

function selectAllItemsByClause(table: string, label: string) {
    return genericItemsByClause('SELECT *', table, label);
}

function selectAllItems(table: string) {
    return genericItemsByClause('SELECT *', table);
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
    insertWrestler: insertItemIntoTable('wrestlers', 'wrestler_id', ['wrestler_name']),
    insertWorkout: insertItemIntoTable('workouts', 'workout_id', ['wrestler_id', 'workout_date']),
    insertRoutine: insertItemIntoTable('routines', 'routine_id', ['routine_label']),
    insertExercise: insertItemIntoTable('exercises', 'exercise_id', ['exercise_name'])
    // deleteWrestlerById: deleteItemByClause('wrestlers', 'wrestler_id'),
    // deleteWorkoutById: deleteItemByClause('workouts', 'workout_id'),
    // deleteSetById: deleteItemByClause('exercise_sets', 'exercise_set_id')
};

