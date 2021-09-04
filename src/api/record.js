import request from '../utils/request';


export function getRecord(paginations, form) {
    return request({
        method: 'get',
        url: `/api/records`,
        params: {
            page: paginations.pageIndex,
            page_size: paginations.pageSize,
            sort: paginations.sort,
            order: paginations.order,
            state: form.state,
            goods_id: form.goods_id
        }
    });
}

export function recordCreate(form) {
    return request({
        method: 'post',
        url: `/api/records`,
        data: {
            goods_id: form.goods_id,
            state: form.state,
            remake: form.remake,
            inventory_count: form.inventory_count
        }
    });
}

