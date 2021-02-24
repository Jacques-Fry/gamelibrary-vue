// 根路径
const root = "/user/user";
import { uploadFile } from "network/common.js";

import {
    request
} from "./request"
//查询用户列表
export function queryUserList(user, pageNo, pageSize) {
    return request({
        method: 'POST',
        url: root + '/queryList',
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
        url: root + '/login',
        params: {
            username,
            password
        }

    })
}
//退出登录
export function logout(username, password) {
    return request({
        url: root + '/logout'
    })
}
//获取登录用户数据
export function details() {
    return request({
        url: root + '/details'
    })
}

//获取用户数据
export function selectUserById(id) {
    return request({
        url: root + '/details/' + id,
        method: "GET"
    })
}

//导出用户数据
export function exportUserData() {
    return request({
        url: root + '/export',
        method: "POST",
        responseType: 'blob'
    })
}
// 导入用户
export function importUserData(file) {
    return uploadFile(root + "/import", file)
}

// 新增用户
export function addUserData(user) {
    return request({
        url: root + '/add',
        method: "POST",
        data: user
    })
}

// 修改用户
export function updUserData(user) {
    return request({
        url: root + '/upd/' + user.id,
        method: "PUT",
        data: {
            username: user.username,
            nickname: user.nickname,
            tel: user.tel,
            avatar: user.avatar,
        }
    })
}

// 上传头像
export function uploadAcatar(file) {
    return uploadFile("http://Jacques-Fry:29109/file/upload", file)
}