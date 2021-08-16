import axios from 'axios';
import { getToken, removeToken } from './auth';

const service = axios.create({
    // baseURL: process.env.VUE_APP_BASE_URL,
    baseURL: process.env.NODE_ENV === 'development' ? '/apps' : process.env.VUE_APP_BASE_URL,
    timeout: 1000 * 60
});

axios.defaults.headers.post['Content-Type'] = 'application/json;charset=utf-8"';


service.interceptors.request.use(config => {
    let token = getToken();
    if (token) {
        config.headers = {
            'Authorization': token
        };
    }
    return config;
}, error => {
    Promise.reject(error);
});
// service.interceptors.request.use(
//     config => {
//         return config;
//     },
//     error => {
//         console.log(error);
//         return Promise.reject();
//     }
// );
//
service.interceptors.response.use(
    response => {
        if (response.status >= 200 && response.status < 300) {
            return response.data;
        } else {
            return Promise.reject(response);
        }
    },
    error => {
        if ((error.response.status === 401) && window.location.hash !== '#/login') {
            localStorage.removeItem('ms_username');
            removeToken();
            window.location = '/';
        } else if (error.response.status === 403) {
            window.location = '/403';
        }
        return Promise.reject(error.response.data);
    }
);

export default service;
