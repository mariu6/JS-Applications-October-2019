const username = "guest";                                                   // име
const password = "pass";                                                      // парола
const baseURL = `https://baas.kinvey.com`;                                    // базов URL 
const appKey = "kid_BJ_Ke8hZg";                                               // 
const appSecret = "420d26d887244128adf072acc12cf151";

function makeHeaders(httpMethod, data) {                                      // създаваме хедърите, които ще пращаме на фетча
    const headers = {
        method: httpMethod,
        headers: {
            "Authorization": `Basic ${btoa(`${username}:${password}`)}`,      // различно при kinvey и basic.  btoa() -> Base64 hash
            "Content-Type": `application/json`,                               // засега го хард-кодваме    
        }
    }
    if (httpMethod === "POST" || httpMethod === "PUT") {                      // когато трябва да изпращаме data
        if (data !== null && data !== undefined) {                            // ако пратим нулл или ъндефайнд, ще се счупи
            headers.body = JSON.stringify(data);                                  // добавяме body към хедърите
        }
        console.log(data)
    }
    return headers;
}

function handleError(e) {                                                     // прихващане на грешки
    if (!e.ok) {
        throw new Error(e.statusText);
    }
    return e;
}

function serializeData(x) {
    return x.json()
}

function fetchData(kinveyModule, endpoint, headers) {
    const url = `${baseURL}/${kinveyModule}/${appKey}/${endpoint}`;          // сглабяме URL-а за гет заявката

    return fetch(url, headers)                                                        // връщаме p romise
        .then(handleError)
        .then(serializeData)
}

export function get(kinveyModule, endpoint) {                                // kModule: appData, user, endpoint: довършека на нашия URL
    const headers = makeHeaders("GET");
    return fetchData(kinveyModule, endpoint, headers);
}

export function post(kinveyModule, endpoint, data) {
    const headers = makeHeaders("POST", data);
    return fetchData(kinveyModule, endpoint, headers);
}

export function put(kinveyModule, endpoint, data) {
    const headers = makeHeaders("PUT", data);
    return fetchData(kinveyModule, endpoint, headers);
}

export function del(kinveyModule, endpoint) {
    const headers = makeHeaders("DELETE");
    return fetchData(kinveyModule, endpoint, headers);
}
