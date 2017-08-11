import Wrestler from '../models/wrestler';
import { Workout } from '../models/workout';


export interface Base<T> {
    type: string;
    payload: T;
}

export class AddWrestler implements Base<Wrestler> {
    type: 'ADD_WRESTLER' = 'ADD_WRESTLER';
    constructor(public payload: Wrestler) { }
}

export class AddWorkout implements Base<Workout> {
    type: 'ADD_WORKOUT';
    constructor(public wrestler: Wrestler, public payload: Workout) { }
}

export class Refresh implements Base<undefined> {
    type: 'REFRESH' = 'REFRESH';
    payload: undefined;
}

export class DeleteWrestlerById implements Base<number> {
    type: 'DELETE_WRESTLER_BY_ID' = 'DELETE_WRESTLER_BY_ID';
    constructor(public payload: number) { }
}

export type types = AddWrestler | AddWorkout | Refresh | DeleteWrestlerById;
