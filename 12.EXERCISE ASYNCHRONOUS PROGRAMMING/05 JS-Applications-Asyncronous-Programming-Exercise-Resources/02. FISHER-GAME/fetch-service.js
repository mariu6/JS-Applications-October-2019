const catches = function () {
    const baseURL = 'https://fisher-game.firebaseio.com/catches/';
    const get = () => {
        return fetch(baseURL + '.json')
            .then((r) => r.json())
    }
    const post = (data) => {
        return fetch(baseURL + '.json', {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((r) => r.json())
    }
    const put = (data,id) => {
        return fetch(baseURL + `${id}.json`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json"
            }
        })
            .then((r) => r.json())
    }
    const del = (id) => {
        return fetch(baseURL + `${id}.json`, {
            method: "DELETE"
        })
            .then(console.log)
            .catch(console.error)
    }

    return {
        get,
        post,
        put,
        del
    }
}();

