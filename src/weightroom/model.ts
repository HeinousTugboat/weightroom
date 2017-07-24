/**
 * weightroom/view-model.ts
 *
 * ViewModel for Weightroom.
 *     Should pull data from store & models
 *     Expose information for views
 *     Should offer hooks for events & commands
 */

import * as Rx from 'rxjs/Rx';
import Wrestler from './models/wrestler';
import {Workout} from './models/workout';
import * as Actions from './actions';

const debug = require('debug');
const log = debug('cumulus:weightroom:model');

export class State {
    private availableActions: Actions.Base<any>[] = [];
    constructor(public wrestlers: Wrestler[] = [], public workouts: Workout[] = []) { }
}

export class Model {
    public state$: Rx.Observable<State>;
    public actions$: Rx.BehaviorSubject<Actions.Base<any>>;
    constructor() {
        this.actions$ = new Rx.BehaviorSubject<Actions.Base<any>>(new Actions.Refresh);
        this.state$ = this.actions$.scan(reducer, new State);
    }
}

function assertNever(x: never): never {
    throw new Error("Unexpected object: " + x);
}

const reducer = (state: State, action: Actions.types): State => {
    switch (action.type) {
        case 'ADD_WRESTLER': return Object.assign({}, state, { wrestlers: [...state.wrestlers, action.payload] });
        case 'DELETE_WRESTLER_BY_ID': return Object.assign({}, state, {wrestlers: state.wrestlers.filter(x=>x.id !== action.payload)})
        case 'ADD_WORKOUT': return Object.assign({}, state, { workouts: [...state.workouts, action.payload] });
        case 'REFRESH': return state;
        default: return assertNever(action);
    }
};
