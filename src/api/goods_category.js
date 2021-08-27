import request from '../utils/request';


export function getCategory(page, page_size, sort, order) {
    return request({
        method: 'get',
        url: `/api/goods/category`,
        params: {
            page: page,
            page_size: page_size,
            sort: sort,
            order: order
        }
    });
}

export function categoryCreate(form) {
    return request({
        method: 'post',
        url: `/api/goods/category`,
        data: form
    });
}

export function categoryEdit(form) {
    return request({
        method: 'put',
        url: `/api/goods/category/${form.id}`,
        data: form
    });
}

export function categoryDelete(operate_id) {
    return request({
        method: 'delete',
        url: `/api/goods/category/${operate_id}`
    });
}


