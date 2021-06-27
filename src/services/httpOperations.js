import axios from 'axios';

const http_get = (url, data) => {
    console.log("url", " data");
    console.log(url, data);
    return axios.get(url, data)
}

const http_post = (url, body, config) => {
    return axios.post(url, body, config);
}

const http_put = (url, body) => {
    return axios.put(url, body);
}

export const httpOperations = {
    http_get: http_get,
    http_post: http_post,
    http_put: http_put
}