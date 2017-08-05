import Wrestler from '../src/weightroom/models/wrestler';
import { Workout, Exercise, ExerciseSet } from '../src/weightroom/models/workout';
import Routine from '../src/weightroom/models/routine';

export function getJSON(url: string): Promise<void> {

    return fetch("/api/wrestlers", {
        headers: {
            'Content-Type': 'application/json'
        },
        method: "POST",
        body: JSON.stringify({ a: 'foo', b: 'bar' })
    })
    .then(res => res.json())
    .then(res => console.log(res))

    // return Promise.resolve(JSON.parse('{}'));
}

export function getHTML(url: string): Promise<HTMLElement> {
    return Promise.resolve(<HTMLElement>{});
}
