const root = "/user/permission";

import {
    request
} from "./request"
// 分页查询权限列表
export function queryPermissionList(permission, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: root + '/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: permission
    })
}

// 查询权限详情
export function selectPermissionDetails(id) {
    return request({
        method: 'GET',
        url: root + '/details/' + id,
    })
}

// 新增权限
export function addPermissionData(user) {
    return request({
        url: root + '/add',
        method: "POST",
        data: user
    })
}

// 修改权限
export function updPermissionData(user) {
    return request({
        url: root + '/upd/' + user.id,
        method: "PUT",
        data: user
    })
}

// 修改权限
export function delPermissionData(id) {
    return request({
        url: root + '/del/' + id,
        method: "DELETE"
    })
}