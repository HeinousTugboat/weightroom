/**
 * weightroom/view-model.ts
 *
 * ViewModel for Weightroom.
 *     Should pull data from store & models
 *     Expose information for views
 *     Should offer hooks for events & commands
 */

import * as Rx from 'rxjs/Rx';
import { Model, State } from './model';
import Wrestler from './models/wrestler';
import { Base as Action, AddWrestler } from './actions';

const debug = require('debug');
const log = debug('cumulus:weightroom:vm');

export default class ViewModel {
    private currentState: State;
    private dispatch$: Rx.Subject<Action<any>>;
    private stateObserver: Rx.Subscription;
    private currentWrestler: Wrestler;
    constructor(private model: Model) {
        this.stateObserver = model.state$.subscribe((newState) => this.currentState = newState);
        this.dispatch$ = model.actions$;

    }
    getState(): State {
        return this.currentState;
    }
    addWrestler(name: string): void {
        // const wrestler = new Wrestler(name); log(wrestler)
        // const action = new AddWrestler(wrestler); log(action)
        // return this.dispatch$.next(action);
        return this.dispatch$.next(new AddWrestler(new Wrestler(name)));
    }
}
