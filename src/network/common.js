import { request } from "./request"

export function getIp() {
  return request({
    url: '/ip/getIp'
  })
}

export const uploadFile = (url, params) => {
  return request({
    method: "POST",
    url: url,
    data: params,
    headers: {
      "Content-Type": "multipart/from-data"
    }
  })
}