import {
    request
} from "./request"

export function queryRoleList(role, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: '/role/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: role
    })
}

export function getAllRole() {
    return request({
        method: 'POST',
        url: '/role/selectAll',
    })
}