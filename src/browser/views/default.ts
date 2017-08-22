export default class DefaultView {
    constructor(public body: HTMLBodyElement) {
        console.log('Default View Constructor...');
        console.log(this.body);
    }
}

console.log('Default View Loaded...');
console.log(System);
