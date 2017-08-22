/// <reference types="systemjs"/>

import * as f from './fetch';

console.log('Client-side JS loaded!');
console.log('VS-Code compilation working!');

const body: HTMLElement = document.getElementsByTagName('body')[0];
if (!body) {
    throw new Error('No body element found.');
}
console.log(body.dataset.view);
const view = body.dataset.view || '';

System.import('views/'+view)
    .then((view)=>{
        const View = view.default;
        const v = new View(body);
        console.log('v', v);
    });
