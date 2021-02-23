import {
    request
} from "./request"
//查询用户列表
export function queryUserList(user, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: '/user/queryList',
        params: {
            pageNo,
            pageSize
        },
        data: user
    })
}
//登录
export function login(username, password) {
    return request({
        url: '/user/login',
        params: {
            username,
            password
        }

    })
}
//退出登录
export function logout(username, password) {
    return request({
        url: '/user/logout'
    })
}
//获取登录用户数据
export function details() {
    return request({
        url: '/user/details'
    })
}

//获取用户数据
export function selectUserById(id) {
    return request({
        url: '/user/details/' + id,
        method: "GET"
    })
}

//导出用户数据
export function exportData() {
    return request({
        url: '/user/export',
        method: "POST",
        responseType: 'blob'
    })
}