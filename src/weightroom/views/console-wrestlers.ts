import * as Rx from 'rxjs/Rx';
import ViewModel from './wrestlers.viewmodel';
import { Model, State } from '../model';
import Wrestler from '../models/wrestler';

const debug = require('debug');
const log = debug('cumulus:views:console-wrestlers');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin
});

export class ConsoleWrestlers {
    private wrestlers: Wrestler[] = [];
    constructor(private vModel: ViewModel) {
        vModel.bind(this.render);
        // vModel.refresh();

        rl.on('line', (input: string) => {
            const words = input.split(/\s/);
            const cmd = words[0].toUpperCase();
            if (cmd === 'ADD') {
                log('Adding '+words.slice(1).join(' '));
                vModel.addWrestler(words.slice(1).join(' '));
            } else if (cmd === 'REFRESH' || cmd === 'UPDATE') {
                log('Refreshing Display');
                vModel.refresh();
            } else if (cmd === 'DELETE') {
                const num = Number.parseInt(words[1]);
                if (num !== undefined) {
                    log(`Deleting id#${num}`);
                    vModel.deleteById(num);
                }
            }
            log('Line Input: '+input.split(/\s/)[0]);
        });
    }
    render(state: State): void {
        state.wrestlers.forEach(wrestler => log(wrestler.name + ' - id#' + wrestler.id + ' - # workouts: '+wrestler.workouts.length));
    }
}
