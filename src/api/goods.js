import request from '../utils/request';


export function getGoods(page, page_size, sort, order) {
    return request({
        method: 'get',
        url: `/api/goods`,
        params: {
            page: page,
            page_size: page_size,
            sort: sort,
            order: order
        }
    });
}

export function goodsCreate(form) {
    return request({
        method: 'post',
        url: `/api/goods`,
        data: {
            name: form.name,
            producer: form.producer,
            number: form.number,
            category_id: form.category_id,
            expired_time: form.expired_time.getTime() / 1000,
            specification: form.specification,
            unit: form.unit,
        }
    });
}

export function goodsEdit(form) {
    return request({
        method: 'put',
        url: `/api/goods/${form.id}`,
        data: {
            name: form.name,
            producer: form.producer,
            number: form.number,
            category_id: form.category_id,
            expired_time: form.expired_time.getTime() / 1000,
            specification: form.specification,
            unit: form.unit,
        }
    });
}

export function goodsDelete(operate_id) {
    return request({
        method: 'delete',
        url: `/api/goods/${operate_id}`
    });
}


