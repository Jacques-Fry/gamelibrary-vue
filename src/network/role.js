import {
  request
} from "./request"

export function queryRoleList(role, pageNum, pageSize) {
  return request({
    method: 'POST',
    url: '/role/queryList',
    params: {
      pageNum,
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