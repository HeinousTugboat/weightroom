// http://brianflove.com/2016/11/08/typescript-2-express-node/
// http://mherman.org/blog/2016/11/05/developing-a-restful-api-with-node-and-typescript/#.WWvhKIjyuUk
// http://expressjs.com/en/starter/generator.html
import express = require('express');
const debug = require('debug');
const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin//,
    // output: process.stdout
});
const log = debug('cumulus:log');
const logDB = debug('xcumulus:db');
const logRx = debug('cumulus:Rx');
const app = express();
const initOptions = {
    // 'postgres://cumulus:nineball@localhost:5432/cumulonimbus'
}
const pgp = require('pg-promise')(initOptions);
const db = pgp('postgres://cumulus:nineball@localhost:60888/cumulonimbus');

app.get('/', function(req, res) {
    res.send('Hello world!');
    log(req);
})

app.listen(58808, function() {
    log('Cumulus listening on port 58808!');
})

log('Cumulus started...');

db.one('SELECT * FROM workouts WHERE workout_id = 1', 123)
    .then(function(data:any) {
        logDB('DATA:', data);
    })
    .catch(function(error:any) {
        logDB('ERROR:', error);
    })

// console.log('\n\n\n');
import * as Rx from 'rxjs/Rx';

// // logRx(Rx.Observable.of(1, 2, 3));

// // rl.on('line', (line: any)=>{
// //     log(`Beep: ${line}`);
// // })
// let subject$ = new Rx.ReplaySubject();
// // let lines = Rx.Observable.fromEvent(rl, 'line').subscribe((x: string) => subject.next(x));
// let line$ = Rx.Observable.fromEvent(rl, 'line').subscribe(subject$);
// // let source = lines;
// // let source = Rx.Observable.range(1, 5).scan((acc, x) => acc + x)
// // let source = Rx.Observable.create((observer: Rx.Observer<string>) => {
// //     observer.next(''+3);
// //     // var id = setInterval(() => {
// //         observer.next('beep')
// //     // }, 1000);
// // });
// let source$ = subject$;

// let subscription = source$.subscribe((x: any) => logRx('sub '+x),
//                (err:any) => log('Error!', err),
//                () => logRx('Source complete..'));

// let sub2 = source$.subscribe(x => logRx('sub2 ' + x));

// subject$.next('Test One');
// subject$.next('Test Two');

// let sub3 = source$.subscribe(x => {
//     if (x === 'test') {
//         subject$.next('Foofoo');
//     }
//     logRx('subLate ' + x)
// });
// subject$.next('Test Three');
// // subject.complete();

// let counter = source$.scan((num: number) => (++num), 0).subscribe(x=>logRx(x))

// let ticker$ = Rx.Observable.interval(1000)
//     .bufferTime(3000)
//     .subscribe((x)=>{
//     // subject.next('tick!tock?');
//         logRx('tick!tock? ', x);
//     })

// http://rudiyardley.com/redux-single-line-of-code-rxjs/

const reducer = (state: {}, action: any): any => {
    switch (action.type) {
        case 'NAME_CHANGED':
            return Object.assign({}, state, { name: action.payload });
            // return { ...state, name: action.payload } // FIX: Node.JS doesn't support object literal spread...
        case 'AGE_CHANGED':
            return Object.assign({}, state, { age: action.payload });
        default:
            return state;
    }
};
const renderer = (state: {}): void => { /*logRx(state)*/ };

const action$ = new Rx.BehaviorSubject({});
const store$ = action$.scan(reducer);
store$.subscribe((state) => renderer(state));
const history$ = store$.scan((history, state) => (history.push(state), history), [])
    .subscribe((history)=>logRx(history))

const actionDispatcher = (func: Function) => (...args: any[]) => action$.next(func(...args));

const changeName = actionDispatcher((payload: any) => ({
    type: 'NAME_CHANGED', payload
}));
const changeAge = actionDispatcher((payload: number) => ({
    type: 'AGE_CHANGED', payload
}));

changeName('Foo');
changeName('Tom Willikers');
changeAge(48);
changeAge(23);
