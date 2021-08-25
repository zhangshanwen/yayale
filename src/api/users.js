import request from '../utils/request';


export function users(page, page_size, sort, order) {
    return request({
        method: 'get',
        url: `/api/users`,
        params: {
            page: page,
            page_size: page_size,
            sort: sort,
            order: order
        }
    });
}

export function userCreate(form) {
    return request({
        method: 'post',
        url: `/api/user`,
        data: {
            user_name: form.user_name,
            mobile: form.mobile,
            password: form.password
        }
    });
}

export function userEdit(form) {
    return request({
        method: 'put',
        url: `/api/user/${form.id}`,
        data: {
            user_name: form.user_name,
            mobile: form.mobile
        }
    });
}

export function userDelete(operate_id) {
    return request({
        method: 'delete',
        url: `/api/user/${operate_id}`
    });
}


export function resetUserPassword(operate_id) {
    return request({
        method: 'get',
        url: `/api/user/password/reset/${operate_id}`
    });
}

export function changePassword(password) {
    return request({
        method: 'put',
        url: `/api/user/password`,
        data: {
            password: password
        }
    });
}
