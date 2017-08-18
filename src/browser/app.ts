import { Workout } from '../models/workout';
import Wrestler from '../models/wrestler';
import * as f from './fetch';
import wrestlerRepo from './repos/wrestlers';

// import Routine from '../models/routine';
console.log('Client-side JS loaded!');
console.log('VS-Code compilation working!');
const repo = {
    wrestlers: new wrestlerRepo(f.getJSON, f.putJSON, f.postJSON)
};

// repo.wrestlers.getWrestlers().then(x => console.table(x));
// repo.wrestlers.postWrestler(new Wrestler('Tom-' + Math.round(Math.random() * 100)))
// repo.wrestlers.getWrestlerFull(67)
//     // .then(x => Promise.resolve(repo.wrestlers.convert(x)))
//     .then(x => {
//         x.age += 17;
//         x.workouts.push(new Workout(x));
//         console.log(x);
//         return Promise.resolve(x);
//     }).then(x => repo.wrestlers.putWrestler(x))
//     .then(x => console.log(x))
//     .catch(x => console.error(x));

// let Joey = new Wrestler('New Joey-'+Math.round(Math.random() * 100));
// Joey.age = 30;
// Joey.weight = 250;

// f.getJSON('/wrestlers')
//     .then(x => x.forEach((item: Wrestler) => console.log('GET', item)))
//     .catch(err => console.error('GET ERROR!', err));
// // f.postJSON('/wrestlers', { wrestler_name: 'Joey-' + Math.round(Math.random() * 100) })
// f.postJSON('/wrestlers', Joey)
//     .then(x => {
//         console.log('POSTRES', x);
//         return Promise.resolve(x);
//     })
//     .then(x => f.getJSON('/wrestlers/' + (<any>x).wrestler_id))
//     .then(x => console.log('POSTGET', x))
//     // .then(x => console.log('POST', x))
//     .catch(err => console.error('POST ERROR!', err));
// f.putJSON('/wrestlers/1', Joey)
//     .then(x => console.log('PUT', x))
//     .catch(err => console.error('PUT ERROR!', err));
// f.deleteJSON('/wrestlers/2')
//     .then(x => console.log('DEL', x))
//     .catch(err => console.error('DELETE ERROR!', err));
f.getHTML('exercise-list')
    .then(el => (<HTMLElement>document.querySelector('main')).appendChild(el))
f.getHTML('exercise-detail', 1)
    .then(el => (<HTMLElement>document.querySelector('main')).appendChild(el))

function submitJSON(data: object) {
    fetch('/wr/wrestlers/add', {
        headers: {
            'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify(data)
    }).then(res => console.log(res))
        // .then(res => { console.log(res), location.reload() })
        .catch(err => console.log(err))
}

let submitButton = document.getElementById('submit');
let formEl = document.getElementById('wrestler-form');
submitButton && submitButton.addEventListener('click', () => console.log('click'));
formEl && formEl.addEventListener('submit', (ev) => {
    console.log('form-submit!');
    ev.preventDefault();
    let formData = new FormData(<HTMLFormElement>formEl);
    let obj = {
        name: formData.get('name'),
        age: formData.get('age')
    }

    submitJSON(obj);
});
// TODO: Clear the form..? Keeps caching my entries...
