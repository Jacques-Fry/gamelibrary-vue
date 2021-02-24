// 根路径
const root = "/user/role";

import {
    request
} from "./request"
// 分页查询角色列表
export function queryRoleList(role, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: root + '/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: role
    })
}
// 获取所有角色
export function getAllRole() {
    return request({
        method: 'POST',
        url: root + '/selectAll',
    })
}