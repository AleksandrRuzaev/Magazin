export function makeGETRequest(url) {
    return fetch(url).then((data) => data.json());
}

export function makePOSTRequest(url, data) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        },
        body: JSON.stringify(data),
    }).then((data) => data.json());
}
