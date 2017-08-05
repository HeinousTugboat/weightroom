import Wrestler from '../src/weightroom/models/wrestler';
import { Workout, Exercise, ExerciseSet } from '../src/weightroom/models/workout';
import Routine from '../src/weightroom/models/routine';
import * as f from './fetch';

console.log('Client-side JS loaded!');
f.getJSON('/wrestlers').then(x => console.log('boop', x))
    .catch(err => console.error('GET ERROR! beeeeeeep', err));
f.deleteJSON('/wrestlers/2').then(x => console.log('deerrrrrp', x))
    .catch(err => console.error('DELETE ERROR! EFF ME!', err));
f.postJSON('/wrestlers', { foo: 'a', bar: 3 })
    .then(x => console.log('POOST!', x))
    .catch(err => console.error('POST ERROR! beeeeeeep', err));
f.putJSON('/wrestlers/1', { foot: 'ad', bart: 34 })
    .then(x => console.log('PUTANG!', x))
    .catch(err => console.error('PUTTY ERROR! beeeeeeep', err));
f.getHTML('exercise-list').then(el=>(<HTMLElement>document.querySelector('main')).appendChild(el))
f.getHTML('exercise-detail', 1).then(el=>(<HTMLElement>document.querySelector('main')).appendChild(el))

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
