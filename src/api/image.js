import request from '../utils/request';


export function images(server_id) {
    return request({
        method: 'get',
        url: `/api/v1/docker/images`,
        params: {
            server_id: server_id
        }
    });
}

export function imagesCreate(address, nick_name, intro) {
    return request({
        method: 'post',
        url: `/api/v1/docker/image`,
        data: {
            address: address,
            nick_name: nick_name,
            intro: intro
        }
    });
}

export function imagesEdit(operate_id, address, nick_name, intro) {
    return request({
        method: 'put',
        url: `/api/v1/docker/image/${operate_id}`,
        data: {
            address: address,
            nick_name: nick_name,
            intro: intro
        }
    });
}

export function imagesDelete(operate_id) {
    return request({
        method: 'delete',
        url: `/api/v1/docker/image/${operate_id}`
    });
}


export function imagesSearch(server_id, image_name) {
    return request({
        method: 'get',
        url: `/api/v1/docker/images/search`,
        params: {
            server_id: server_id,
            image_name: image_name
        }
    });
}


