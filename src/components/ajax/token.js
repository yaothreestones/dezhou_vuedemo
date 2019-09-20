import axios from 'axios'

const AUTH_TOKEN = localStorage.getItem('token');

const instance = axios.create({});
instance.defaults.headers['X-Auth-Token'] = AUTH_TOKEN;
instance.interceptors.request.use(config => {
    let url = config.url;
    config.headers['X-Auth-Token'] = localStorage.getItem('token');
    return config
}, err => {
    return Promise.reject(err)
});
instance.interceptors.response.use(res => {
    if (res.data.data && res.data.data.token) {
        localStorage.setItem('token', res.data.data.token);
    } else if (res.data.code != 200) {

    }
    return res
}, err => err)
export default instance;