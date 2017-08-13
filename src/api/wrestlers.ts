import Wrestler from '../models/wrestler';
import { Workout } from '../models/workout';
import db from '../db';
import * as express from 'express';
import * as pgPromise from 'pg-promise';
import * as url from 'url';

const sendRes = (res: express.Response) => (data: any) => res.send(data);
const errorRes = (res: express.Response) => (error: pgPromise.errors.QueryResultError) => res.status(404).send({ error: error.name, query: error.query });
const insertRes = (req: express.Request, res: express.Response, id: string) => (data: any) => res.status(201).location('' + req.get('origin') + url.parse(req.url).pathname + '/' + data[id]).send(data)

const insertWrestler = (req: express.Request, res: express.Response) =>
    db.wrestlers.add(req.body).then(insertRes(req, res, 'wrestler_id')).catch(errorRes(res));
const getWrestlerById = (req: express.Request, res: express.Response) =>
    db.wrestlers.findById(req.params.wrestler_id)
        .then(sendRes(res)).catch(errorRes(res));
const getWrestlersFull = (req: express.Request, res: express.Response) =>
    db.wrestlers.findByIdFull(req.params.wrestler_id)
        .then(data => res.send({ wrestler: data[0], workouts: data[1] }))
        .catch(errorRes(res));
const getWrestlerByName = (req: express.Request, res: express.Response) =>
    db.wrestlers.findByName(req.params.wrestler_name)
        .then(sendRes(res)).catch(errorRes(res));
const updateWrestler = (req: express.Request, res: express.Response) =>
    db.wrestlers.update(req.params.wrestler_id, req.body).then(sendRes(res)).catch(errorRes(res));
const getAllWrestlers = (req: express.Request, res: express.Response) =>
    db.wrestlers.all().then(sendRes(res)).catch(errorRes(res));

const insertWorkout = (req: express.Request, res: express.Response) =>
    db.wrestlers.addWorkout(req.body).then(insertRes(req, res, 'workout_id')).catch(errorRes(res));
const getWorkouts = (req: express.Request, res: express.Response) =>
    db.wrestlers.findWorkouts(req.params.wrestler_id).then(sendRes(res)).catch(errorRes(res));
const getWorkoutsById = (req: express.Request, res: express.Response) =>
    db.wrestlers.findWorkoutById(req.params.workout_id, req.params.wrestler_id)
        .then(sendRes(res)).catch(errorRes(res));
const updateWorkout = (req: express.Request, res: express.Response) =>
    db.wrestlers.updateWorkout(req.params.workout_id, req.body).then(sendRes(res)).catch(errorRes(res));

let wrestlers;
export default wrestlers = {
    insertWrestler: insertWrestler,
    getWrestlerById: getWrestlerById,
    getWrestlersFull: getWrestlersFull,
    getWrestlerByName: getWrestlerByName,
    updateWrestler: updateWrestler,
    getAllWrestlers: getAllWrestlers,
    insertWorkout: insertWorkout,
    getWorkouts: getWorkouts,
    getWorkoutsById: getWorkoutsById,
    updateWorkout: updateWorkout
};
