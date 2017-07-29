/**
 * weightroom/views/index.ts
 * View for /wr/index.html
 */

import * as Rx from 'rxjs/Rx';
import ViewModel from './wrestlers.viewmodel';
import { Model, State } from '../model';
import Wrestler from '../models/wrestler';

const debug = require('debug');
const log = debug('cumulus:views:index');

export class IndexView {
    private wrestlersNumber: number = 0;
    constructor(private vModel: ViewModel) {
        vModel.state$.subscribe(state=>this.wrestlersNumber = state.wrestlers.length);
    }
    render(): View {
        return {
            title: 'Weightroom',
            header: 'Welcome to the Weightroom!',
            content: 'Foo Bar ruly duly! '+this.wrestlersNumber+' wrestlers reporting for duty! Sir!' // TODO: Move more of this into views/index.pug
        }
    }
}

export interface View {
    title: string;
    header: string;
    content: string;
}
