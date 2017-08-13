import * as express from 'express';

import db from '../db';
import { wrestlerJSON } from '../models/json-interfaces';
import Wrestler from '../models/wrestler';

/**
 * Primary Route handler for weightroom stuff. Routes should come in to here,
 *   and this should reach out to Views to request correct info. Views should,
 *   well, provide it. Duh.
 */

const debug = require('debug');
const log = debug('cumulus:weightroom');
const router: express.Router = express.Router();

router.get('/', (req, res, next) => {
    res.render('index');
})

router.get('/wrestlers', (req, res, next) => {
    let wrestlers: wrestlerJSON[];
    db.wrestlers.all()
        .then(data => Promise.resolve(data.map(x => Wrestler.fromJSON(x))))
        .then(wrestlers => res.render('wrestlers', { title: 'Wrestler', header: 'Wrestler List', wrestlers: wrestlers }));
})
// TODO: This needs a partial and proper implementation. Should be a form entry, I think.
router.get('/wrestlers/add', (req, res, next) => {
    res.redirect('../wrestlers');
})
router.get('/wrestlers/:wrestler_id', (req, res, next) => {
    db.wrestlers.findById(req.params.wrestler_id)
        .then(data => Promise.resolve(Wrestler.fromJSON(data)))
        .then(wrestler => res.render('wrestler-profile', wrestler))
})

export default router;
