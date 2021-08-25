import request from '../utils/request';


export function login(mobile, password) {
    return request({
        method: 'post',
        url: `/api/user/login`,
        data: {
            key: mobile,
            password: password
        }
    });
}

export function logout() {
    return request({
        method: 'delete',
        url: `/api/user/logout`
    });
}
