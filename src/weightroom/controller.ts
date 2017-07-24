/**
 * weightroom/view-model.ts
 *
 * ViewModel for Weightroom.
 *     Should pull data from store & models
 *     Expose information for views
 *     Should offer hooks for events & commands
 */

import * as Rx from 'rxjs/Rx';

export default class Controller {
    public dispatch: any;
    public state: any;
    constructor() {
        this.dispatch = {};
        this.state = {};
    }
}

interface Wrestler {
    id: number;
    name: string;
}

interface Routine {}

interface AppState {
    wrestlers: Wrestler[];
    routines: string[];
}


class AddWrestler {
    constructor(public id: number, public name: string) { }
}
type Action = AddWrestler;


function wrestlers(initState: Wrestler[], actions: Rx.Observable<Action>) {
    return actions.scan((state, action) => {
        if (action instanceof AddWrestler) {
            const newWrestler = {
                name: action.name,
                id: action.id
            };
            return [...state, newWrestler];
        } else {
            return state;
        }
    }, initState)
}

function routines(initState: Routine[], actions: Rx.Observable<Action>) {
    return actions.scan((state, action) => {
        return state;
    }, initState)
}

function wrapIntoBehavior(init: AppState, obs: Rx.Observable<any>) {
    const res = new Rx.BehaviorSubject(init);
    obs.subscribe(s => res.next(s));
    return res;
}

function stateFn(initState: AppState, actions: Rx.Observable<Action>): Rx.Observable<AppState> {
    const combine = (s:any) => ({ wrestlers: s[0], routines: s[1] });
    const appStateObs: Rx.Observable<AppState> =
        wrestlers(initState.wrestlers, actions)
        .zip(routines(initState.routines, actions)).map(combine);
    return wrapIntoBehavior(initState, appStateObs);
}
