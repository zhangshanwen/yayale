import request from '../utils/request';


export function servers(page, page_size, sort, asc) {
    return request({
        method: 'get',
        url: `/api/v1/servers`,
        params: {
            page: page,
            page_size: page_size,
            sort: sort,
            asc: asc
        }
    });
}

export function serverCreate(address, nick_name, intro) {
    return request({
        method: 'post',
        url: `/api/v1/servers`,
        data: {
            address: address,
            nick_name: nick_name,
            intro: intro
        }
    });
}

export function serverEdit(operate_id, address, nick_name, intro) {
    return request({
        method: 'put',
        url: `/api/v1/servers/${operate_id}`,
        data: {
            address: address,
            nick_name: nick_name,
            intro: intro
        }
    });
}

export function serverDelete(operate_id) {
    return request({
        method: 'delete',
        url: `/api/v1/servers/${operate_id}`
    });
}




