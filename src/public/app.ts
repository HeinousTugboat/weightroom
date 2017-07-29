console.log('Client-side JS loaded!');

function submitJSON(data: object) {
    fetch('/wr/wrestler/add', {
        headers: {
            'Content-Type': 'application/json'
        }, method: 'POST',
        body: JSON.stringify(data)
    })
        .then(res => { console.log(res), location.reload() })
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
