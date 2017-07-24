import ViewModel from './weightroom/views/wrestlers.viewmodel';
import { ConsoleWrestlers as View }from './weightroom/views/console-wrestlers';
import { Model } from './weightroom/model';

const debug = require('debug');
const log = debug('cumulus:weightroom');

const model = new Model;
const vm = new ViewModel(model);


// log(model);
// log(vm);
model.state$.subscribe(x => log(x));
log('Adding Joe');
vm.addWrestler('Joe');
log('Joe added');

vm.addWrestler('Bob');
vm.addWrestler('John Cena');
const view = new View(vm);
// vm.refresh();
