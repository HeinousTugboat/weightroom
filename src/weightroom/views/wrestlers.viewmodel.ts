/**
 * weightroom/view-model.ts
 *
 * ViewModel for Weightroom.
 *     Should pull data from store & models
 *     Expose information for views
 *     Should offer hooks for events & commands
 */

import * as Rx from 'rxjs/Rx';
import { Model, State } from '../model';
import Wrestler from '../models/wrestler';
import * as Actions from '../actions';

const debug = require('debug');
const log = debug('cumulus:weightroom:views:wrestlers.vm');

export default class ViewModel {
    private currentState: State;
    private dispatch$: Rx.Subject<Actions.Base<any>>;
    private stateObserver: Rx.Subscription;
    private currentWrestler: Wrestler;
    public state$: Rx.Observable<State>;
    constructor(public model: Model) {
        this.stateObserver = model.state$.subscribe((newState) => { this.currentState = newState });
        this.state$ = model.state$;
        this.dispatch$ = model.actions$;

    }
    bind(fn: (s: State) => void): void {
        this.state$.subscribe(fn);
    }
    getState(): State {
        return this.currentState;
    }
    addWrestler(name: string): void {
        return this.dispatch$.next(new Actions.AddWrestler(new Wrestler(name)));
    }
    deleteById(id: number): void {
        return this.dispatch$.next(new Actions.DeleteWrestlerById(id));
    }
    refresh(): void {
        this.dispatch$.next(new Actions.Refresh());
    }
}
