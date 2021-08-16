import request from '../utils/request';


export function login(mobile, password) {
    return request({
        method: 'post',
        url: `/api/v1/user/login`,
        data: {
            mobile: mobile,
            password: password
        }
    });
}
