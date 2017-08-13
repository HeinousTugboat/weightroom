import * as express from 'express';
import * as pgPromise from 'pg-promise';
import * as url from 'url';

import db from '../db';

const sendRes = (res: express.Response) => (data: any) => res.send(data);
const errorRes = (res: express.Response) => (error: pgPromise.errors.QueryResultError) => res.status(404).send({ error: error.name, query: error.query });
const insertRes = (req: express.Request, res: express.Response, id: string) => (data: any) => res.status(201).location('' + req.get('origin') + url.parse(req.url).pathname + '/' + data[id]).send(data)

const insertExercise = (req: express.Request, res: express.Response) =>
    db.exercises.add(req.body).then(insertRes(req, res, 'exercise_id')).catch(errorRes(res));
const getExercises = (req: express.Request, res: express.Response) =>
    db.exercises.all().then(sendRes(res)).catch(errorRes(res));
const getExerciseById = (req: express.Request, res: express.Response) =>
    db.exercises.findById(req.params.exercise_id)
        .then(sendRes(res)).catch(errorRes(res));
const updateExercise = (req: express.Request, res: express.Response) =>
    db.exercises.update(req.params.exercise_id, req.body).then(sendRes(res)).catch(errorRes(res));

let exercises;
export default exercises = {
    insertExercise: insertExercise,
    getExercises: getExercises,
    getExerciseById: getExerciseById,
    updateExercise: updateExercise
};
