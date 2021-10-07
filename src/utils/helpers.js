export function makeGETRequest(url) {
    return fetch(url).then((data) => data.json());
}
