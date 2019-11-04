export function request(props) {
    return new Promise(async function (resolve, reject) {
        let { url, method, content } = props;
        const options = {
            method
        };


        if (method === 'GET') {
            url += '?' + Object.keys(content).map(key => `${key}=${content[key]}`).join('&');
        } else if (method === 'PUT' || method === 'DELETE') {
            options.body = JSON.stringify(content);
        } else {
            options.body = new FormData();
            Object.keys(content).forEach(key => options.body.append(key, content[key]));
        }

        const response = await fetch(url, options)
            .then(res => {
                return { status: res.status, result: res.json() }
            })
            .catch(() => reject('Unkown error'));

        response.result.then(data => {
            if (response.status == 200 || response.status == 201) {
                resolve(data);
            } else {
                reject(data);
            }
        }).catch(() => resolve({}));
    })
}


