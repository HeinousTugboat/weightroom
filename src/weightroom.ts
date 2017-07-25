/**
 * Primary Route handler for weightroom stuff. Routes should come in to here,
 *   and this should reach out to Views to request correct info. Views should,
 *   well, provide it. Duh.
 */

import express = require('express');
import ViewModel from './weightroom/views/wrestlers.viewmodel';
import { ConsoleWrestlers as View }from './weightroom/views/console-wrestlers';
import { IndexView } from './weightroom/views/index';
import { Model } from './weightroom/model';

const debug = require('debug');
const log = debug('cumulus:weightroom');
const router = express.Router();

const model = new Model;
const vm = new ViewModel(model);

vm.addWrestler('Joe');
vm.addWrestler('Bob');
vm.addWrestler('John Cena');
const view = new View(vm);
const indexView = new IndexView(vm);

router.get('/', function(req, res, next) {
    res.render('index', indexView.render());
});
router.get('/wrestler', function(req, res, next) {
    res.render('wrestler', {title: 'Wrestler', header: 'Wrestler List', wrestlers: vm.getState().wrestlers})
});
router.get('/wrestler/add', function(req, res, next) {
    vm.addWrestler('Unidentified Dude-'+Math.ceil(Math.random()*100));
    res.redirect('../wrestler');
})
export default router;
