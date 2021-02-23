import {
  request
} from "./request"

export function queryPermissionList(permission, pageNum, pageSize) {
  return request({
    method: 'POST',
    url: '/permission/queryList',
    params: {
      pageNum,
      pageSize
    },
    data: permission
  })
}

export function selectDetails(id) {
  return request({
    method: 'GET',
    url: '/permission/details/'+id,
  })
}