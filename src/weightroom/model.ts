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
    public actions$: Rx.BehaviorSubject<Actions.Base<any>>;
    private store$: Rx.BehaviorSubject<any>;
    public state$: Rx.Observable<any>;
    constructor() {
        this.actions$ = new Rx.BehaviorSubject<Actions.Base<any>>(new Actions.Refresh);
        this.store$ = new Rx.BehaviorSubject<State>(new State);
        this.actions$.scan(reducer, new State).subscribe(this.store$);
        this.state$ = Rx.Observable.from(this.store$.asObservable());
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

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/*
const actions$ = new Rx.BehaviorSubject({ names: [], workouts: [] });

const states$ = (function(actions$) {
    const store$ = new Rx.BehaviorSubject({});
    actions$.scan(wrestlers)
        .zip(actions$.scan(workouts))
        .map(states => ({ names: (states[0].names), workouts: (states[1].workouts) }))
        .subscribe(store$);

    return Rx.Observable.from(store$).asObservable();
})(actions$)

actions$.next({ type: 'ADD_NAME', payload: 'Joe Book' });
actions$.next({ type: 'ADD_NAME', payload: 'Fee Foe' });
actions$.next({ type: 'ADD_NAME', payload: 'J. Cena' });
states$.subscribe(state => renderer(state));

// ViewModel: creates action dispatcher
const actionDispatcher = (func) => (...args) => actions$.next(func(...args));
const basicDispatcher = (type) => (payload) => actions$.next(({ type, payload }));
// ViewModel: specific actions..
const changeName = actionDispatcher((payload) => ({ type: 'NAME_CHANGED', payload }));
const changeAge = actionDispatcher((payload) => ({ type: 'AGE_CHANGED', payload }));
const addName = actionDispatcher((payload) => ({ type: 'ADD_NAME', payload }));
addName('John C. the Greater');


basicDispatcher('ADD_NAME')('Fooe')
const addNameBasic = basicDispatcher('ADD_NAME');
addNameBasic('John C. the Strange');
basicDispatcher('ADD_WORKOUT')('Foo Workout')
basicDispatcher('ADD_WORKOUT')('Foo Workout')
basicDispatcher('ADD_WORKOUT')('Foo Workout')
*/
