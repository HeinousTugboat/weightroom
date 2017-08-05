import Wrestler from '../src/weightroom/models/wrestler';
import { Workout, Exercise, ExerciseSet } from '../src/weightroom/models/workout';
import Routine from '../src/weightroom/models/routine';

export function getJSON(url: string = ''): Promise<void> {
    return fetch('/api' + url, {
        headers: new Headers,
        method: "GET"
    }).then(res => res.json())
}

export function postJSON(url: string = '', obj: any = {}): Promise<void> {
    return fetch('/api' + url, {
        headers: { 'Content-Type': 'application/json' },
        method: "POST",
        body: JSON.stringify(obj)
    }).then(res => res.json())
}

export function putJSON(url: string = '', obj: any = {}): Promise<void> {
    return fetch('/api' + url, {
        headers: { 'Content-Type': 'application/json' },
        method: "PUT",
        body: JSON.stringify(obj)
    }).then(res => res.json())
}

export function deleteJSON(url: string = ''): Promise<void> {
    return fetch('/api' + url, {
        headers: new Headers,
        method: "DELETE"
    }).then(res => res.json())
}

export function getHTML(template: string, id?: number): Promise<HTMLElement> {
    let el = document.createElement('template');
    let url = '/wr/partials/' + template;
    if (id) url += '/' + id;
    return fetch(url).then(x => x.text()).then((s) => {
        let el: HTMLTemplateElement = document.createElement('template');
        el.innerHTML = s;
        return Promise.resolve(document.importNode(<HTMLTemplateElement>el.content.firstChild, true));
    })
}
