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

export function getWrestlers(req: express.Request, res: express.Response) {
    db.many('SELECT * FROM wrestlers')
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

export function getWrestlersById(req: express.Request, res: express.Response) {
    db.one('SELECT * FROM wrestlers WHERE wrestler_id = ${wrestler_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

export function getWrestlersByIdFull(req: express.Request, res: express.Response) {
    Promise.all([
            db.one('SELECT * FROM wrestlers WHERE wrestler_id = ${wrestler_id}', req.params),
            db.many('SELECT * FROM workouts NATURAL JOIN routines WHERE wrestler_id = ${wrestler_id}', req.params)
    ]).then(data => res.send({ wrestler: data[0], workouts: data[1] }))
    .catch(error => res.send(error));
}

export function getWorkoutsByWrestler(req: express.Request, res: express.Response) {
    db.many('SELECT * FROM workouts WHERE wrestler_id = ${wrestler_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

export function getWorkoutsByWrestlerAndId(req: express.Request, res: express.Response) {
    db.one('SELECT * FROM workouts WHERE workout_id = ${workout_id} AND wrestler_id = ${wrestler_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.status(404).send({error: error.name, query: error.query}));
}

export function getRoutines(req: express.Request, res: express.Response) {
    db.many('SELECT * FROM routines')
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

export function getRoutinesById(req: express.Request, res: express.Response) {
    db.one('SELECT * FROM routines WHERE routine_id = ${routine_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

export function getExercises(req: express.Request, res: express.Response) {
    db.many('SELECT * FROM exercises')
        .then(data => res.send(data))
        .catch(error => res.send(error));
}

export function getExercisesById(req: express.Request, res: express.Response) {
    db.one('SELECT * FROM exercises WHERE exercise_id = ${exercise_id}', req.params)
        .then(data => res.send(data))
        .catch(error => res.send(error));
}
