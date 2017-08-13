import * as bodyParser from 'body-parser';
import express = require('express');
import sass = require('node-sass-middleware');

import api from './api';
import weightroom from './weightroom';

// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
// import * as Rx from 'rxjs/Rx';
const debug = require('debug');
const log = debug('cumulus:log');
const app = express();

function logUnsafe(req: express.Request, res: express.Response, next: express.NextFunction) {
    log(`!${req.method} ${req.url}`);
    next();
}

app.use(bodyParser.json());
app.set('view engine', 'pug');
app.use(sass({
    src: 'stylesheets',
    response: true,
    indentedSyntax: false
}));

app.route('/:path*').put(logUnsafe).post(logUnsafe).delete(logUnsafe)
app.get('/', (req, res) => {
    res.render('index', { title: '[HInd] Weightroom', header: 'Welcome to the Weightroom', content: 'Foo. Bar.' });
});
app.get('/sink', (req, res) => res.render('sink', { title: '[HInd] Kitchen Sink' }))
app.use('/wr', weightroom);
app.use('/api', api);

app.use(express.static('public'));
app.use('/vendor', express.static('vendor'));
app.listen(58808, () => log('Cumulus listening on port 58808!'));

log('Cumulus started...');
