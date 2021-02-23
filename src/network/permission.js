import {
    request
} from "./request"

export function queryPermissionList(permission, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: '/permission/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: permission
    })
}

export function selectDetails(id) {
    return request({
        method: 'GET',
        url: '/permission/details/' + id,
    })
}