
// export function getJSON(url: string = ''): Promise<any> {
//     return fetch('/api' + url, {
//         headers: new Headers,
//         method: "GET"
//     }).then(res => res.json())
// }

// export function postJSON(url: string = '', obj: any = {}): Promise<any> {
//     return fetch('/api' + url, {
//         headers: { 'Content-Type': 'application/json' },
//         method: "POST",
//         body: JSON.stringify(obj)
//     }).then(res=>{
//         console.log(res.headers.get('location'));
//         return Promise.resolve(res);
//     })
//     .then(res => res.json())
// }

// export function putJSON(url: string = '', obj: any = {}): Promise<any> {
//     return fetch('/api' + url, {
//         headers: { 'Content-Type': 'application/json' },
//         method: "PUT",
//         body: JSON.stringify(obj)
//     }).then(res => res.json())
// }

// // export function deleteJSON(url: string = ''): Promise<void> {
// //     return fetch('/api' + url, {
// //         headers: new Headers,
// //         method: "DELETE"
// //     }).then(res => res.json())
// // }
